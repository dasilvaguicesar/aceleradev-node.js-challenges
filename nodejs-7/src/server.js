const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { animals } = require('./model/')

app.use(bodyParser.json())

app.get('/v1/animals', async (req, res, next) => {
  try {
    const data = await animals.findAll({})
    res.status(200).json({
      total: data.length,
      data
    })
  } catch (err) {
    console.log(err)
  }
})

app.get('/v1/animals/:animalId', async (req, res, next) => {
  try {
    const { animalId } = req.params
    const data = await animals.findOne({
    where: { id: animalId }
  })
  res.status(200).json(data)
  } catch (err) {
    console.log(err) 
  }
})

app.post('/v1/animals', async (req, res, next) => {

  try {
    const data = await animals.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    console.log(err)
  }
})

app.patch('/v1/animals/:animalId', async (req, res, next) => {
  try {
    const { animalId } = req.params
    const bodyUpdate = req.body
    await animals.update(bodyUpdate, {
      where: { 
        id: animalId
      }
    })
    res.status(200).json({})
  } catch (err) {
    console.log(err)
  }
})

app.delete('/v1/animals/:animalId', async (req, res, next) => {
  try {
    const { animalId } = req.params
    const data = await animals.destroy({
    where: { 
      id: animalId
    }
  })
  res.status(204).json(data)
  } catch (err) {
    console.log(err)
  }
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
