const NotificationDAO = require('../DAO/NotificationDAO'); 

const NotificationService = {
    async createNotification(resourceId, message) {
        try {
            return await NotificationDAO.createNotification(resourceId, message);
        } catch (error) {
            console.error('NotificationService Error:', error.message);
            throw error;
        }
    },

    async getReceiversToNotify(resourceId) {
        try {
            return await NotificationDAO.getReceiversToNotify(resourceId);
        } catch (error) {
            console.error('NotificationService Error:', error.message);
            throw error;
        }
    },

    async getSharerToNotify(resourceId) {
        try {
            return await NotificationDAO.getSharerToNotify(resourceId);
        } catch (error) {
            console.error('NotificationService Error:', error.message);
            throw error;
        } 
    },

    async createUserNotifications(userId, notificationId) {
        try {
            return await NotificationDAO.createUserNotifications(userId, notificationId);
        } catch (error) {
            console.error('NotificationService Error:', error.message);
            throw error;
        }
    },

    async getUserNotifications(userId) {
        try {
            const result = await NotificationDAO.getUserNotifications(userId);
            return result;

        } catch (error) {
            console.error('Error retrieving user notifications:', error);
            throw error;
        }
    },

    async markAsRead(notificationId, userId) {
        try {
            await NotificationDAO.markAsRead(notificationId, userId);
            return { success: true, message: 'Notification marked as seen.' };
        } catch (error) {
            console.error('Error marking notification as seen:', error);
            throw error;
        }
    },

    async deleteNotification(notificationId, userId) {
        try {
            await NotificationDAO.deleteNotification(notificationId, userId);
            return { success: true, message: 'Notification deleted.' };
        } catch (error) {
            console.error('Error deleting notification for user:', error);
            throw error;
        }
    }
};

module.exports = NotificationService;
