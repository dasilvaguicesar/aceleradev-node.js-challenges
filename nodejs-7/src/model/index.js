const Sequelize = require('sequelize')
const path = require('path')
const db = {}

const sequelize = new Sequelize(
  'codenation', // DB Name
  'root', // DB User
  '1234', // DB Password
  {
    host: 'localhost', // DB Host
    port: 3306, // DB Port
    dialect: 'mysql'
  }
)

const animals = sequelize.import(
  path.join(__dirname, 'animals.js')
)

db[animals.name] = animals

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db