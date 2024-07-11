'use strict'
const NotificationService = require('../services/notification.service');

class NotificationController {
    async getNotifications(req, res) {
        try {
            const notifications = NotificationService.getNotifications();
            return res.json(notifications);
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }

    async clearNotifications(req, res) {
        try {
            const result = NotificationService.clearNotifications();
            if (result) {
                return res.status(204).send();
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: 'Failed to clear notifications'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
}

module.exports = new NotificationController();