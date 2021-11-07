const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const { errors } = require('./middlewares')

require('dotenv').config()
require('./services/authGoogle')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    )
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mountRoutes = require('./routes')

mountRoutes(app)

app.use(errors.errorHandler)

module.exports = app
