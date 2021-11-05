function CustomError(message) {
    Error.call(this, message)
    this.name = 'CustomError'
    this.message = message

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError)
    }
    else {
        this.stack = (new Error()).stack
    }
}

function UnauthorizedError(message) {
    Error.call(this, message)
    this.name = 'UnauthorizedError'
    this.message = message || 'Пользователь не авторизован'

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UnauthorizedError)
    }
    else {
        this.stack = (new Error()).stack
    }
}

function ForbiddenError(message) {
    Error.call(this)
    this.name = 'ForbiddenError'
    this.message = message || 'Недостаточно прав'

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ForbiddenError)
    }
    else {
        this.stack = (new Error()).stack
    }
}

function NotFoundError(message) {
    Error.call(this)
    this.name = 'NotFoundError'
    this.message = message || 'Объект не найден'

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotFoundError)
    }
    else {
        this.stack = (new Error()).stack
    }
}

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

module.exports = {
    CustomError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ValidationError
}
