const { validationResult } = require('express-validator')

function ValidationError(fields) {
    Error.call(this, fields)
    this.name = 'ValidationError'
    this.message = 'Ошибка при валидации'
    this.fields = fields
  
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
    else {
      this.stack = (new Error()).stack
    }
  }

const customValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return { [error.param]: error.msg }
    }
})

const validate = (req, res, next) => {
    const errors = customValidationResult(req).array()
        if (errors && errors.length && errors.length > 0) {
        let errorObject = {}
        errors.forEach(error => {
            for (const key in error) {
                errorObject[key] = error[key]
            }
        })
        return next(new ValidationError(errorObject))
    }
    return next()
}

module.exports = validate
