const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notification.controller')
const { asyncHandler } = require('../../auth/checkAuth');

router.get('/', asyncHandler(notificationController.getNotifications));
router.delete('/', asyncHandler(notificationController.clearNotifications));

module.exports = router;