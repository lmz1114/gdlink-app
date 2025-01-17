const { getConnection } = require('../db'); 
const { snakeToCamel } = require('../tools/camelTransform');

const NotificationDAO = {
    async createNotification(resourceId, message) {
        const conn = await getConnection();
        try {
            const query = `INSERT INTO notifications (resource_id, message) VALUES (?, ?)`;
            const result = await conn.query(query, [resourceId, message]);
            return result;
        } catch (error) {
            console.error('NotificationDAO Error:', error.message);
            throw error;
        } finally {
            conn.release();
        }
    },

    async getReceiversToNotify(resourceId) {
        const conn = await getConnection();
        try {
            const query = `SELECT receiver_id FROM sharing WHERE resource_id = ?;`;
            const rows = await conn.query(query, [resourceId]);
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error fetching receivers:', error.message);
            throw error;
        } finally {
            conn.release();
        }
    },

    async createUserNotifications(userId, notificationId) {
        const conn = await getConnection();
        try {
            const query = `INSERT INTO user_notification (user_id, notification_id) VALUES (?, ?)`;
            const result = await conn.query(query, [userId, notificationId]);
            return result;
        } catch (error) {
            console.error('NotificationDAO Error:', error.message);
            throw error;
        } finally {
            conn.release();
        }
    },

    async getUserNotifications(userId) {
        const conn = await getConnection();
        try {
            const query = `
                SELECT n.notification_id, n.message, n.created_at, un.read_status
                FROM notifications n INNER JOIN user_notification un
                ON n.notification_id = un.notification_id
                WHERE un.user_id = ? ORDER BY n.created_at DESC`;
            rows = await conn.query(query, [userId]);
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error in fetching user notifications:', error);
            throw error;
        } finally {
            conn.release();
        }
    },

    
    async markAsRead(notificationId, userId) {
        const conn = await getConnection();
        try {
            const query = `UPDATE user_notification SET read_status = 1 WHERE notification_id = ? AND user_id = ?`;
            await conn.query(query, [notificationId, userId]);
        } catch (error) {
            console.error('Error in marking notification as seen:', error);
            throw error;
        } finally {
            conn.release();
        }
    },

   
    async deleteNotification(notificationId, userId) {
        const conn = await getConnection();
        try {
            const query = `DELETE FROM user_notification WHERE notification_id = ? AND user_id = ?`;
            await conn.query(query, [notificationId, userId]);
        } catch (error) {
            console.error('Error in deleting user notification:', error);
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = NotificationDAO;
