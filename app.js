const express = require('express')
const logger = require('./utils/logger')
const cors = require('cors')
const bodyParser = require('body-parser')
const { errors } = require('./middlewares')
const { generateRandomCode } = require('./utils/helpers')

require('dotenv').config()

const app = express()

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

const loggingMiddleware = (req, res, next) => {
  let id = generateRandomCode(4)
  logger.info(`Request ${req.method} ${id}: ${req.originalUrl}, query: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}`)
  let oldWrite = res.write
  let oldEnd = res.end

  let chunks = []
  
  res.write = function (chunk) {
    chunks.push(Buffer.from(chunk))

    oldWrite.apply(res, arguments)
  }

  res.end = function (chunk) {
    if (chunk)
      chunks.push(Buffer.from(chunk));

    let body = Buffer.concat(chunks).toString('utf8')
    logger.info(`Response ${req.method} ${id}: ${req.originalUrl}, response: ${body}`)

    oldEnd.apply(res, arguments)
  }

  next()
}

app.use(loggingMiddleware)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

const mountRoutes = require('./routes')

mountRoutes(app)

app.use(errors.errorHandler)

module.exports = app
