const express = require('express')
const app = express()
const movies = require('../imdb-movies')

function genNumber (obj) { 
  function genRandom(lenght) {
    const max = lenght;
    const min = 1;
    return Math.random() * (max - min) + min;
  }
  return parseInt(genRandom(Object.keys(obj).length));
}
/*
const generateRandomNumberForObject = obj => {
  const max = Object.keys(obj).length
  const min = 1
  const randon = Math.randon() * (max - min) + min
  return parseInt(randon)
}*/

function searchMov (data) {
  const {Director, Title} = data[genNumber(data)]
  return {director:Director, movie:Title}
}

function searchDirMov (data, reqDirector) {
  const specificDirector = data.filter(data => data.Director === reqDirector)
  const {Director, Title} = specificDirector[genNumber(specificDirector)]
  return {director:Director, movie:Title}
}

app.get('/v1/movie', async (req, res, next) => {
  res.send(searchMov(movies))
})

app.get('/v1/movie/:director', async (req, res, next) => { 
  res.send(searchDirMov(movies, req.params.director))
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
