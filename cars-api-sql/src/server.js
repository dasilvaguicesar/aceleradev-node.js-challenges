const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { cars } = require('./model/')

app.use(bodyParser.json())

app.get('/v1/cars', async (req, res, next) => {
    try {
        const allDataDB = await cars.findAll()
        res.status(200).json({
            'total': (Object.keys(allDataDB)).length,
            'data': allDataDB
        })
    } catch (err) {
    }
})

app.get('/v1/cars/:carId', async (req, res, next) => {
    try {
        const id = req.params.carId
        const result = await cars.findById(id)
        if (!result) {
            res.status(404).json({error: `The record "${id}" couldn't be found.`})
        } else {
            res.status(200).json(result)
        }
        
    } catch (err) {
        console.log(err)
    }
})

app.post('/v1/cars', async (req, res, next) => {
    try {
        const result = await cars.create(req.body)
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
    }
})

app.patch('/v1/cars/:carId', async (req, res, next) => {
    try {
        const id = req.params.carId
        const body = req.body
        const result = await cars.update(body, id)
        if(!result){
            res.status(404).json({error: `The record "${id}" couldn't be found.`})
        } else {
            res.status(200).json(result)
        }
    } catch (err) {
        console.log(err)
    }
})

app.delete('/v1/cars/:carId', async (req, res, next) => {
    try {
        const id = req.params.carId
        const result = await cars.delete(id)
        if(!result){
            res.status(404).json({error: `The record "${id}" couldn't be found.`})
        } else {
            res.status(204).json('Removed')
        }
    } catch (err) {
        console.log(err)
    }    
})

module.exports = { app }
