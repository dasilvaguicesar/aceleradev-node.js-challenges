const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

app.use( bodyParser.json() )

/* app.use((req,res,next) => {
    console.log(req.originalUrl)
    next()
} )

app.use((req, res, next) => {
    if (req.originalUrl === '/proibidao'){
        return res.json({'mensagem': 'voce não pode fazer isso'})
    }
    next()
}) */

app.use('/v1', routes)


module.exports = { app }
