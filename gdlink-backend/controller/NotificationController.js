const NotificationService = require('../service/NotificationService');

const NotificationController = {
    
    async getUserNotifications(req, res) {
        try {
            const userId = req.params.userId;
            const result = await NotificationService.getUserNotifications(userId);
            console.log(result);
            return res.json({ notifications: result});
        } catch (error) {
            console.error('Error in fetching user notifications:', error.message);
            res.status(500).json({
                message: 'Failed to fetch notifications',
                error: error.message,
            });
        }
    },

    
    async markAsRead(req, res) {
        try {
            console.log(req.params)
            const userId = req.params.userId;
            const notificationId = req.params.notificationId;
            const result = await NotificationService.markAsRead(notificationId, userId);
            return res.json(result);
        } catch (error) {
            console.error('Error in marking notification as read:', error.message);
            res.status(500).json({
                message: 'Failed to mark notification as read',
                error: error.message,
            });
        }
    },

    async deleteNotification(req, res) {
        try {
            const userId = req.params.userId;
            const notificationId = req.params.notificationId;
            const result = await NotificationService.deleteNotification(notificationId, userId);
            return res.json(result);
        } catch (error) {
            console.error('Error in deleting notification:', error.message);
            res.status(500).json({
                message: 'Failed to delete notification',
                error: error.message,
            });
        }
    }
};

module.exports = NotificationController;
