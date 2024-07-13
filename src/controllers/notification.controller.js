'use strict'
const NotificationService = require('../services/notification.service');
const { SuccessResponse } = require("../core/success.response");

class NotificationController {
    async getNotifications(req, res, next) {
        new SuccessResponse({
            message: 'Get Notification Success!',
            metadata: await NotificationService.getNotifications()
        }).send(res)
    }

    async clearNotifications(req, res, next) {
        new SuccessResponse({
            message: 'Clear Notification Success!',
            metadata: await NotificationService.clearNotifications()
        }).send(res)
    }
}

module.exports = new NotificationController();