const Sequelize = require('sequelize')
const path = require('path')

const config = require('../config')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    ...config.db,
    dialect: 'mysql'
  }
)

const students = sequelize.import(
  path.join(__dirname, 'students.js')
)

const monitors = sequelize.import(
  path.join(__dirname, 'monitors.js')
)

const db = {}

db[students.name] = students
db[monitors.name] = monitors

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = db
