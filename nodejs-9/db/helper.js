const mysql = require('mysql')
const { dbConfig } = require('../config')

const connection = mysql.createConnection(dbConfig)

const queryHelper = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) reject(error)

      resolve(results)
    })
  })
}

const insertFormatter = data => {
  const { values, columns } = Object.keys(data).reduce((acc, curr, ) => {
    let value = data[curr]

    if (curr !== 'age' && curr !== 'is_employed') {
      value = `'${value}'`
    }

    acc.values.push(value)
    acc.columns.push(curr)

    return acc
  }, { values: [], columns: [] })

  return {
    values: values.join(','),
    columns: columns.join(','),
  }
}

const updateFormatter = data => {
  return Object.keys(data).reduce((acc, curr) => {
    let value = data[curr]

    if (curr !== 'age' && curr !== 'is_employed') {
      value = `'${value}'`
    }
    acc.push(`${curr}=${value}`)

    return acc
  }, []).join(',')
}

module.exports = {
  connection,
  queryHelper,
  insertFormatter,
  updateFormatter
}
