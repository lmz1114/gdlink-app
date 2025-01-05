const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const FavouriteDAO = {
    async setFavourite(userId,resourceId){
        const conn = await getConnection();
        try{
            const query = `
                INSERT INTO favourite_resources (user_id, resource_id)
                VALUES (?, ?)`;
            
            const result = await conn.query(query,[userId,resourceId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Resource added to favourites successfully' };
            } else {
                return { success: false, message: 'Failed to add resource to favourites' };
            }

        }catch(error){
            console.error('Error occurred while setting as favourite:', error);
            return {
                error: true,
                message: 'An error occurred while setting as favourite. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },
    async removeFavourite(userId,resourceId){
        const conn = await getConnection();
        try{
            const query = `DELETE FROM favourite_resources WHERE user_id = ? AND resource_id = ?;`;
            const result = await conn.query(query,[userId,resourceId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Resource removed from favourites successfully' };
            } else {
                return { success: false, message: 'Failed to remove resource from favourites' };
            }
        }catch(error){
            console.error('Error occurred while removing favourite:', error);
            return {
                error: true,
                message: 'An error occurred while removing favourite. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },
    async isFavourite(userId,resourceId){
        const conn = await getConnection();
        try{
            const query = `SELECT * FROM favourite_resources WHERE user_id = ? AND resource_id = ?;`;
            const row = await conn.query(query,[userId,resourceId]);
            return row.length > 0;
        }catch(error){
            console.error('Error occurred while checking is favourite:', error);
            return {
                error: true,
                message: 'An error occurred while checking is favourite. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },
    async getFavouriteResources(userId){
        const conn = await getConnection();
        try {
            const query = `SELECT r.resource_id,r.sessem,
                                    c.category_name, c.color,
                            r.description,r.ref_name 
                            FROM resources r INNER JOIN favourite_resources f ON r.resource_id = f.resource_id
                            INNER JOIN category c ON r.category_id = c.category_id WHERE f.user_id = ? ORDER BY f.created_at DESC;`;
            rows = await conn.query(query,[userId]);
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error occurred while retrieving resources:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.',
            };
        } finally {
            if (conn) conn.release(); 
        }
    },
    async getFilteredResources(userId,categories,semesters){
        const conn = await getConnection();
        try {
            let query = `SELECT r.resource_id,r.sessem,
                                    c.category_name,c.color,
                            r.description,r.ref_name 
                            FROM resources r INNER JOIN favourite_resources f ON r.resource_id = f.resource_id
                            INNER JOIN category c ON r.category_id = c.category_id WHERE f.user_id = ?`;
            let queryParams = [userId];
    
            if (categories && categories.length > 0) {
                query += ' AND category_name IN (?)';
                queryParams.push(categories);
            }
    
            if (semesters && semesters.length > 0) {
                query += ' AND sessem IN (?)';
                queryParams.push(semesters);
            }

            query += ' ORDER BY created_at DESC;'
    
            const rows = await conn.query(query, queryParams);
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },

    async getSearchedResources(userId,key){
        const conn = await getConnection();
        try {
            let query = `SELECT 
                            r.resource_id,
                            r.sessem,
                            c.category_name,
                            c.color,
                            r.description,
                            r.ref_name,
                            MATCH(r.ref_name, r.description) AGAINST(?) AS relevance
                        FROM 
                            resources r
                        INNER JOIN 
                            favourite_resources f ON r.resource_id = f.resource_id
                        INNER JOIN 
                            category c ON r.category_id = c.category_id WHERE f.user_id = ?
                        AND MATCH(r.ref_name, r.description) AGAINST(?)
                        ORDER BY 
                            relevance DESC;
                        `;
                    
            const rows = await conn.query(query, [key,userId,key]);

            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },
}

module.exports = FavouriteDAO;