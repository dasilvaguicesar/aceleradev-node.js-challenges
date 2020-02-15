// Os métodos de controle das rotas devem ser implementados em /src/controllers/index.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById
} = require('./controllers/')

app.get('/v1/students', getAll)

app.get('/v1/students/:studentId', getById)

app.post('/v1/students', create)

app.patch('/v1/students/:studentId', updateById)

app.delete('/v1/students/:studentId', deleteById)

module.exports = {
  app
}
