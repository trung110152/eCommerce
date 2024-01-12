'use strict'
const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad Request Error',
    CONFLICT: 'Conflict Error'
}

const { ReasonPhrases, StatusCodes} = require('../utils/httpStatusCode')
const { UNAUTHORIZED } = require('../utils/statusCodes')
class ErrorRespone extends Error {
    
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorRespone {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}
class BadRequestError extends ErrorRespone {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorRespone {

    constructor(message = ReasonPhrases.UNAUTHORIZED, status = UNAUTHORIZED) {
        super(message, status)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError
}