const {
  queryHelper,
  insertFormatter,
  connection
} = require('../db/helper')

const populateTable = async (table, data) => {
  const { columns, values } = insertFormatter(data)
  const query = `INSERT INTO ${table} (${columns}) VALUES (${values});`

  const response = await queryHelper(query)

  return response
}

const cleanTable = async (table) => {
  const response = await queryHelper(`TRUNCATE TABLE ${table}`)

  return response
}

module.exports = {
  connection,
  populateTable,
  cleanTable
}
