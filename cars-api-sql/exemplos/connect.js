const mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'codenation_aula'
});
 
connection.connect();
 
const makeQuery = query => {

    return new Promise ((resolve, reject) => {

        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            resolve(results)
        })

    })
    
}

module.exports = {
    makeQuery,
    connection,
}