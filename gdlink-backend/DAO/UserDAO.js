const { getConnection } = require('../db');

const UserDAO = {
    async getAllLecturer(user_id) {
        const conn = await getConnection();  // Await to ensure connection is properly established
        try {
            const query = 'SELECT user_id FROM users WHERE role = "Pensyarah" AND user_id != ?';
            const rows = await conn.query(query, [user_id]);
            return rows;  // Return the result
        } catch (error) {
            // Log the error and return a user-friendly message
            console.error('Error occurred while retrieving lecturers:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving lecturers. Please try again later.',
            };
        } finally {
            conn.release();  // Ensure the connection is released even if an error occurs
        }
    },
    
    async getAllStudent(user_id) {
        const conn = await getConnection();  // Await to ensure connection is properly established
        try {
            const query = 'SELECT user_id FROM users WHERE role LIKE "%Pelajar%" AND user_id != ?';
            const rows = await conn.query(query, [user_id]);
            return rows;  // Return the result
        } catch (error) {
            // Log the error and return a user-friendly message
            console.error('Error occurred while retrieving students:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving students. Please try again later.',
            };
        } finally {
            conn.release();  // Ensure the connection is released even if an error occurs
        }
    },
    
    async getAllUsers(user_id) {
        const conn = await getConnection();  // Await to ensure connection is properly established
        try {
            const query = 'SELECT user_id FROM users WHERE user_id != ?;';
            const rows = await conn.query(query, [user_id]);
            return rows;  // Return the result
        } catch (error) {
            // Log the error and return a user-friendly message
            console.error('Error occurred while retrieving users:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving users. Please try again later.',
            };
        } finally {
            conn.release();  // Ensure the connection is released even if an error occurs
        }
    }    
};

module.exports = UserDAO;
