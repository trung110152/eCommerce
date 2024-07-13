'use strict'
const notificationModel = require('../models/notification.model')
class NotificationService {
    static addNotification = async(notification) => {
        await notificationModel.create({content: notification})
    }

    static getNotifications = async () => {
        return notificationModel.find()
    }

    static clearNotifications = async () => {
        notificationModel.deleteMany()
        return true;
    }
}

module.exports =  NotificationService;