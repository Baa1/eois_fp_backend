const Result = require('../utils/result')
const logger = require('../utils/logger')

const getMetaFromError = error => {
  try {
    const { stack } = error
    let info = stack.split('\n')[1].split('\\')
    let meta = info[info.length - 1]
    let fileName = meta.split(':')[0]
    let lineNumber = meta.split(':')[1]
    return `${fileName}: ${lineNumber}`
  }
  catch {
    return null
  }
}

const errorHandler = (error, req, res, next) => {
  let result = new Result()
  if (error) {
    if (!['ValidationError', 'NotFoundError'].includes(error.name)) {
      const location = getMetaFromError(error)
      logger.error(Object.assign(
        { name: error.name },
        error.message ? { message: error.message } : {},
        location ? { location } : {})
      )
    }
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
      case 'ConflictError':
        result.setConflict()
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
