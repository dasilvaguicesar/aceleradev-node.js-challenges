const http = require('http');
const fs = require('fs');

const { loadCSV, parseCSV, createHTML } = require('./fileSystem');

const PORT = 3000;
const PATH = '/movies';

const FILE_PATH = 'files/views/';
const EXT = '.html';

const SERVER = 'http://localhost:' + PORT + PATH;

const htmlResponse = (response, html = '', status = 200) => {
    response.statusCode = status;
    response.write(html.toString());
    response.end();
}

const getMovies = () => fs.readdirSync(FILE_PATH).filter(file => file.endsWith(EXT)).map(file => file.substr(0, file.indexOf('.')));

(async () => {
  const csv = await loadCSV('movies');
  const movies = await parseCSV(csv);

  if (getMovies().length < movies.length) {
    console.log('Generating movies from CSV file...');
    
    try {
      await createHTML(movies);

      console.log('READY!');
    } catch (error) {
      console.log(error);
    }
  }
})();

const server = http.createServer((request, response) => {
    try {
        switch (request.url) {
            case '/favicon.ico':
                return htmlResponse(response);

            case PATH:
            case PATH + '/':
                const html = getMovies()
                                .sort((movie1, movie2) => {
                                    if (+movie1 > +movie2) {
                                        return 1;
                                    }

                                    if (+movie1 < +movie2) {
                                        return -1;
                                    }

                                    return 0;
                                })
                                .reduce((moviesHtml, movie) => {
                                    return moviesHtml + '<a href="' + SERVER + '/' + movie + '">' + ('000' + movie).substr(-4) + '</a> . ';
                                }, '<html><head><title>Movies</title></head><body><h1>Movies</h1>') + '</body></html>'

                return htmlResponse(response, html);
            
            default:
                const movie = request.url.substr((PATH + '/').length);

                if (!movie) {
                    throw 'Path not found';
                }
                
                if (!getMovies().includes(movie)) {
                    throw 'Movie not found';
                }

                fs.exists(FILE_PATH + movie + EXT, exists => {
                    if (!exists) {
                        throw 'Movie not found';
                    }

                    fs.readFile(FILE_PATH + movie + EXT, (error, html) => {
                        htmlResponse(response, error || html, error ? 500 : 200);
                    });
                });
        }
    } catch (error) {
        htmlResponse(response, error, 404);
    }
})

server.listen(PORT, () => {
    console.log('Server running at ' + SERVER);
});
