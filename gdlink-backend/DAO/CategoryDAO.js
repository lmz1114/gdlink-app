const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const CategoryDAO = {
    async getCategoryList(){
        const conn = await getConnection();
        try{
            const query = 'SELECT * FROM CATEGORY';
            const rows = await conn.query(query);

            for (const row of rows) {
                row.accessibility = row.accessibility.split(',');
            }
            
            return rows.map(snakeToCamel);
        }catch(error){
            console.error('Error occurred while retrieving categories:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving categories. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }

    },

    async createCategory(categoryName, color, accessibility) {
        const conn = await getConnection();
        try {
            console.log(categoryName, color, accessibility);
            const query = `
                INSERT INTO category (category_name, color, accessibility)
                VALUES (?, ?, ?);
            `;
            const result = await conn.query(query, [categoryName, color, accessibility]);
            if(result.affectedRows>0){
                return {success: true, message:'Category successfully added.'};
            }else{
                return {success: false, message:'Category failed to be added.'};
            }
        } catch (error) {
            console.error('Error occurred while creating category:', error);
            return {
                success: false,
                message: 'An error occurred while saving the category to the database.',
            };
        } finally {
            if (conn) conn.release();
        }
    },

    async updateCategory(categoryId, categoryName, color, accessibility) {
        const conn = await getConnection();
        try {
            // Start a transaction to ensure atomicity
            await conn.beginTransaction();
    
            // Update the category
            const updateQuery = `
                UPDATE category
                SET category_name = ?, color = ?, accessibility = ?
                WHERE category_id = ?
            `;
            const updateResult = await conn.query(updateQuery, [categoryName, color, accessibility, categoryId]);
            
            await conn.commit();

            if(updateResult.affectedRows>0){
                return {success: true, message:'Category successfully edited.'};
            }else{
                return {success: false, message:'Category failed to be edited.'};
            }
            } catch (error) {
            // Rollback the transaction in case of an error
            if (conn) await conn.rollback();
            console.error('Error occurred while updating category:', error);
            throw new Error('Failed to update category. Please try again later.');
        } finally {
            if (conn) conn.release();
        }
    },
    

    async deleteCategory(categoryId) {
        const conn = await getConnection();
        try {
            const query = 'DELETE FROM category WHERE category_id = ?';
            const result = await conn.query(query, [categoryId]);

            if (result.affectedRows > 0) {
                return { success: true, message: 'Resource deleted successfully' };
            } else {
                return { success: false, message: 'Resource not found' };
            }
            
        } catch (error) {
            console.error('Error occurred while deleting category:', error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    },

    async getCategoryById(categoryId) {
        const conn = await getConnection();
        try {
            const query = `SELECT category_id, category_name, color, accessibility FROM category WHERE category_id = ?`;
            const rows = await conn.query(query, [categoryId]);
            if (rows.length === 0) {
                console.log('No category found in database for ID:', categoryId);
                return null; 
            }

            if(rows[0].accessibility){
                rows[0].accessibility = rows[0].accessibility.split(',');
                console.log(rows);
            }else{
                rows[0].accessibility = [];
            }
            return rows; 
        } catch (error) {
            console.error('Error fetching category by ID:', error);
            throw new Error('Failed to fetch category.');
        } finally {
            conn.release();
        }
    } 
}

module.exports = CategoryDAO;
