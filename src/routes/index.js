'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();


//check api key
router.use(apiKey)
//check permission
router.use(permission('0000'))

router.use('/v1/api/contact', require('./contact'))
router.use('/v1/api/notification', require('./notification'))
router.use('/v1/api/post', require('./post'))
router.use('/v1/api/user', require('./access'))

module.exports = router