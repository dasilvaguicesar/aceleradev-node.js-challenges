const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { animals } = require('./model/')

app.use(bodyParser.json())

app.get('/v1/animals', async (req, res, next) => {
  res.status(501).send('Not Implemented')
})

app.get('/v1/animals/:animalId', async (req, res, next) => {
  res.status(501).send('Not Implemented')
})

app.post('/v1/animals', async (req, res, next) => {
  const data = animals.create(req.body)
  res.status(201).json(data)
})

app.patch('/v1/animals/:animalId', async (req, res, next) => {
  res.status(501).send('Not Implemented')
})

app.delete('/v1/animals/:animalId', async (req, res, next) => {
  res.status(501).send('Not Implemented')
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}

module.exports = {
  app,
  start,
  stop
}
