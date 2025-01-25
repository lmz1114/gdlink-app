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
            const query = `SELECT receiver_email AS email FROM sharing WHERE resource_id = ?;`;
            const rows = await conn.query(query, [resourceId]);
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error fetching receivers:', error.message);
            throw error;
        } finally {
            conn.release();
        }
    },

    async getSharerToNotify(resourceId) {
        const conn = await getConnection();
        try {
            const query = `SELECT u.email AS email, r.sharer_id AS id
                            FROM resources r
                            JOIN users u ON r.sharer_id = u.user_id
                            WHERE r.resource_id = ?;`;
            const rows = await conn.query(query, [resourceId]);

            if (rows && rows.length > 0) {
                const sharer = snakeToCamel(rows[0]); 
                return sharer; 
            }
            return '';
        } catch (error) {
            console.error('Error fetching receivers:', error.message);
            throw error;
        } finally {
            conn.release();
        }
    },

    async createUserNotifications(userEmail, notificationId) {
        const conn = await getConnection();
        try {
            const query = `INSERT INTO user_notification (user_email, notification_id) VALUES (?, ?)`;
            const result = await conn.query(query, [userEmail, notificationId]);
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
                SELECT n.notification_id, n.message, n.created_at, un.read_status, n.resource_id
                FROM notifications n INNER JOIN user_notification un
                ON n.notification_id = un.notification_id
                INNER JOIN users u ON un.user_email = u.email
                WHERE u.user_id = ? ORDER BY un.read_status ASC, n.created_at DESC, n.notification_id DESC`;
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
            const query = `UPDATE user_notification un
                            INNER JOIN users u ON un.user_email = u.email
                            SET un.read_status = 1
                            WHERE un.notification_id = ? AND u.user_id = ?;`;
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
            const query = `DELETE un
                            FROM user_notification un
                            INNER JOIN users u ON un.user_email = u.email
                            WHERE un.notification_id = ? AND u.user_id = ?;`;
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
