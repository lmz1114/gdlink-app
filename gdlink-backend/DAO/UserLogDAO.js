const { getConnection } = require('../db'); 
const { snakeToCamel } = require('../tools/camelTransform');

const UserLogDAO = {
    async insertUserLog(userId, action) {
        const conn = await getConnection();
        try {
            const query = `INSERT INTO user_log (user_id, action) VALUES (?, ?)`;
            const result = await conn.query(query, [userId, action]);
            return result;
        } catch (error) {
            console.error('UserLog DAO Error:', error.message);
            throw error;
        } finally {
            conn.release();
        }
    },


    async getUserLogs() {
        const conn = await getConnection();
        try {
            let query = 
            `SELECT 
                ul.user_id AS userId,
                u.role as role,
                IFNULL(u.name, 'N/A') AS user_name, 
                ul.action AS action,
                ul.action_time 
            FROM 
                user_log ul
            LEFT JOIN 
                users u ON ul.user_id = u.user_id 
                ORDER BY ul.action_time DESC`;
    
            const rows = await conn.query(query);
            return rows.map(snakeToCamel); 
        } catch (error) {
            console.error('Error in fetching user logs:', error);
            throw error;
        } finally {
            conn.release();
        }
    },

    async getSearchedUserLogs(key) {
        const conn = await getConnection();
        try {
            const query = `
                SELECT 
                    ul.user_id AS userId,
                    IFNULL(u.name, 'N/A') AS user_name, 
                    ul.action AS action,
                    ul.action_time ,
                    u.role
                FROM 
                    user_log ul
                LEFT JOIN 
                    users u ON ul.user_id = u.user_id
                WHERE
                    ul.user_id LIKE ? OR u.name LIKE ? 
                ORDER BY ul.action_time DESC
            `;
    
            const rows = await conn.query(query, [`%${key}%`, `%${key}%`]);
    
            return rows.map(snakeToCamel); 
        } catch (error) {
            console.error('Error fetching searched user logs:', error);
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = UserLogDAO;
