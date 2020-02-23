const express = require('express')
const app = express()
const { makeQuery } = require ('./connect')

app.get('/cars/:carId', async (request, response) => {
    const { params: {carId} } = request  // const { params } = request
    const query = `SELECT * FROM cars_example WHERE id=${carId};`  // id=${params.carId}
    const carById = await makeQuery(query)
    response.json(carById)
})

app.get('/users/:usersId', async (request, response) => {
    const { params: {usersId} } = request  // const { params } = request
    const query = `SELECT * FROM users WHERE id=${usersId};`  // id=${params.usersId}
    const userById = await makeQuery(query)
    response.json(userById)
})

app.listen(8080, function () {
    console.info('%s listening at port %s', app.name, 8080)
  })
  