const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// init db
require('./dbs/init.mongodb');
// const { checkOverload } = require('./helpers/check.connect');
// checkOverload();

//init routes
app.use('/', require('./routes'))
//handling error

//1. neu ko co router nào phù hợp thì tra ve loi 404
app.use((req, res, next) => {
    const error = new Error('Not Found :: App.js!')
    error.status = 404
    next(error)
})
//2. Xu ly loi (1.) truyen ve hoac bat ky loi o cac noi khac gui ve
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status( statusCode ).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error :: App.js'
    })
})

module.exports = app;