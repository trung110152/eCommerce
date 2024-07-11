'use strict'

class NotificationService {
    static addNotification = async(notification) => {
        this.notifications.push(notification);
        // Có thể thêm logic để giới hạn số lượng thông báo được lưu trữ
        if (this.notifications.length > 100) {
            this.notifications.shift(); // Xóa thông báo cũ nhất nếu vượt quá 100
        }
    }

    static getNotifications = async () => {
        return this.notifications;
    }

    static clearNotifications = async () => {
        this.notifications = [];
        return true;
    }
}

module.exports =  NotificationService;