const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const UserDAO = {
    async getUserData(userId){
        const conn = await getConnection();

        try{
            const query = 'Select* from users where user_id = ?';
            const rows = await conn.query(query,[userId]);

            return rows.map(snakeToCamel);

        }catch(error){
            console.error('Error occurred while user data:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving user data. Please try again later.',
            };
        }finally{
            if (conn) conn.release(); 
        }
    },

    async getUserPicture(userId){
        const conn = await getConnection();

        try{
            const query = 'SELECT picture FROM users WHERE user_id = ?';
            const rows = await conn.query(query,[userId]);

            return rows.map(snakeToCamel);

        }catch(error){
            console.error('Error occurred while retrieving user picture:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving user picture. Please try again later.',
            };
        }finally{
            if (conn) conn.release(); 
        }
    },

    async updatePicture(userId,imagePath){
        const conn = await getConnection();

        try{
            const query = 'UPDATE users SET picture = ? WHERE user_id = ?';
            const result = await conn.query(query,[imagePath,userId]);

            if(result.affectedRows>0){
                return {success: true, message:'Picture successfully uploaded.'};
            }else{
                return {success: false, message:'Picture failed to be uploaded.'};
            }
        }catch(error){
            console.error('Error occurred while uploading picture:', error);
            return {
                error: true,
                message: 'An error occurred while uploading picture. Please try again later.',
            };
        }finally{
            if (conn) conn.release(); 
        }
    },

    async deletePicture(userId){
        const conn = await getConnection();

        try{
            const query = 'UPDATE users SET picture = NULL WHERE user_id = ?';
            const result = await conn.query(query,[userId]);

            if(result.affectedRows>0){
                return {success: true, message:'Picture successfully deleted.'};
            }else{
                return {success: false, message:'Picture failed to be deleted.'};
            }
        }catch(error){
            console.error('Error occurred while deleting picture:', error);
            return {
                error: true,
                message: 'An error occurred while deleting picture. Please try again later.',
            };
        }finally{
            if (conn) conn.release(); 
        }
    },

    async getUserPassword(userId){
        const conn = await getConnection();

        try{
            const query = 'SELECT password FROM users WHERE user_id = ?';
            const rows = await conn.query(query,[userId]);
            return rows.map(snakeToCamel);
            
        }catch(error){
            console.error('Error occurred while retrieving password:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving password. Please try again later.',
            };
        }finally{
            if (conn) conn.release(); 
        }
    },

    async updatePassword(userId,hashedPassword){
        const conn = await getConnection();

        try{
            const query = 'UPDATE users SET password = ?, is_pass_changed = 1 WHERE user_id = ?';
            const result = await conn.query(query,[hashedPassword, userId]);

            if(result.affectedRows>0){
                return {success: true, message:'Password successfully updated.'};
            }else{
                return {success: false, message:'Password failed to be updated.'};
            }
        }catch(error){
            console.error('Error occurred while updating password:', error);
            return {
                error: true,
                message: 'An error occurred while updating password. Please try again later.',
            };
        }finally{
            if (conn) conn.release(); 
        }
    },

    async getAllLecturer(userId) {
        const conn = await getConnection();  
        try {
            const query = 'SELECT user_id FROM users WHERE role = "Pensyarah" AND user_id != ?';
            const rows = await conn.query(query, [userId]);
            return rows.map(snakeToCamel);  
        } catch (error) {
            console.error('Error occurred while retrieving lecturers:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving lecturers. Please try again later.',
            };
        } finally {
            if(conn) conn.release();  
        }
    },
    
    async getAllStudent(userId) {
        const conn = await getConnection();  // Await to ensure connection is properly established
        try {
            const query = 'SELECT user_id FROM users WHERE role LIKE "%Pelajar%" AND user_id != ?';
            const rows = await conn.query(query, [userId]);
            return rows.map(snakeToCamel);  
        } catch (error) {
            console.error('Error occurred while retrieving students:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving students. Please try again later.',
            };
        } finally {
            if(conn) conn.release();  
        }
    },
    
    async getAllUsers(userId) {
        const conn = await getConnection();  
        try {
            const query = 'SELECT user_id FROM users WHERE user_id != ?;';
            const rows = await conn.query(query, [userId]);
            return rows.map(snakeToCamel);  
        } catch (error) {
            console.error('Error occurred while retrieving users:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving users. Please try again later.',
            };
        } finally {
            if(conn) conn.release();  
        }
    }    
};

module.exports = UserDAO;
