const fs = require('fs')
const path = require('path')
const { toHTML } = require('./template')

const loadCSV = (filename) => {
    return new Promise((resolve, reject) => {
        const path = 'files/assets/'
        fs.readFile(path + filename + '.csv', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve('' + data);
            }
        });
    });
}

const parseCSV = (csv) => {
    return new Promise((resolve, reject) => {
        try {
            const data = {
                header: new Array(),
                rows: new Array()
            };

            csv.split('\n')
                .filter(row => row.trim().length > 0)
                .forEach(row => {
                    const cells = new Array();

                    (row + '')
                        .split(',')
                        .map(cell => cell.replace(/""/g, '"'))
                        .forEach(cell => cells.push(cell));

                    data.rows.push(cells);
                });

            data.header = data.rows.shift();

            data.rows.forEach((row, rowIndex) => {
                const toDelete = new Array();

                row.forEach((cell, cellIndex) => {
                    if (cell.startsWith('"')) {
                        let i = 0;
                        cell = cell.substr(1);

                        let last;
                        let next;

                        do {
                            i++;
                            next = row[cellIndex + i];

                            last = next.endsWith('"');

                            cell += ',' + (last ? next.substr(0, next.length - 1) : next);
                            
                            toDelete.push(cellIndex + i);
                        } while (next && !last);

                        row[cellIndex] = cell;
                    }
                });

                data.rows[rowIndex] = row.filter((cell, index) => !toDelete.includes(index));
            });

            const movies = new Array();

            data.rows
                .forEach(movie => {
                    const currentMovie = new Object();

                    data.header.forEach((head, index) => {
                        currentMovie[head] = movie[index];
                    });

                    movies.push(currentMovie);
                });

            resolve(movies);
        } catch (error) {
            reject(error);
        }
    });
}

const createHTML = (movies) => {
    return new Promise((resolve, reject) => {
        try {
            movies.forEach(async (movie) => {
                try {
                    await writeFile(movie.rank, toHTML(movie));
                } catch (error) {
                    reject(error);
                }
            });

            resolve([ 'Created with success' ]);
        } catch (error) {
            reject(error);
        }
    });
}

const writeFile = (rank, html) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(path.resolve('files/views/' + rank + '.html'), html, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    resolve(result);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    loadCSV,
    parseCSV,
    createHTML    
}
