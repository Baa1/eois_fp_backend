
const Result = require('../utils/result')
const { ValidationError, CustomError, UnauthorizedError, ForbiddenError } = require('../utils/errors')

const errorHandler = (error, req, res, next) => {
  let result = new Result()
  if (error) {
    switch (error.name) {
      case 'CustomError':
        result.setUnprocessable()
        result.setErrorMessage(error.message)
        break
      case 'UnauthorizedError':
        result.setUnauthorized()
        if (error.message) {
          result.setErrorMessage(error.message)
        }
        break
      case 'ForbiddenError':
        result.setForbidden()
        break
      case 'NotFoundError':
        result.setNotFound()
        if (error.message) {
          result.setErrorMessage(error.message)
        }
        break
      case 'ValidationError':
        result.setUnprocessable()
        result.setError({ fields: error.fields })
        break
      default:
        result.setServerError()
        break
    }
  }
  else {
    result.setUnknownError()
  }
  res.status(result.status).send(result)
}

module.exports = {
    errorHandler
}
