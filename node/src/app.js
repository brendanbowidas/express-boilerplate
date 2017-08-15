const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorhandler = require('errorhandler')
const helmet = require('helmet')
const expressSanitizer = require('express-sanitizer')

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSanitizer())

if (!isProduction) {
  app.use(errorhandler())
}

app.use(require('./routes'))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    /* eslint-disable no-console */
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  })
})

module.exports = app
