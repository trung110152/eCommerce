'use strict'

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth');

module.exports = router