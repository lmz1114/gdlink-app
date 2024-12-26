const { getConnection } = require('../db');

const FavouriteDAO = {
    async setFavourite(user_id,resource_id){
        const conn = await getConnection();
        try{
            const query = `
                INSERT INTO favourite_resources (user_id, resource_id)
                VALUES (?, ?)`;
            
            const result = await conn.query(query,[user_id,resource_id]);
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
    async removeFavourite(user_id,resource_id){
        const conn = await getConnection();
        try{
            const query = `DELETE FROM favourite_resources WHERE user_id = ? AND resource_id = ?;`;
            const result = await conn.query(query,[user_id,resource_id]);
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
    async isFavourite(user_id,resource_id){
        const conn = await getConnection();
        try{
            const query = `SELECT * FROM favourite_resources WHERE user_id = ? AND resource_id = ?;`;
            const row = await conn.query(query,[user_id,resource_id]);
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
    async getFavouriteResources(user_id){
        const conn = await getConnection();
        try {
            const query = `SELECT r.resource_id,c.color,
                            r.description,r.ref_name 
                            FROM resources r INNER JOIN favourite_resources f ON r.resource_id = f.resource_id
                            INNER JOIN category c ON r.category_id = c.category_id WHERE f.user_id = ? ORDER BY f.created_at DESC;`;
            rows = await conn.query(query,[user_id]);
            return rows;
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
    async getFilteredResources(user_id,categories,semesters){
        const conn = await getConnection();
        console.log(categories);
        try {
            let query = `SELECT r.resource_id,c.color,
                            r.description,r.ref_name 
                            FROM resources r INNER JOIN favourite_resources f ON r.resource_id = f.resource_id
                            INNER JOIN category c ON r.category_id = c.category_id WHERE f.user_id = ?`;
            let queryParams = [user_id];
    
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
            console.log(rows);
            return rows;
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },

    async getSearchedResources(user_id,key){
        const conn = await getConnection();
        try {
            let query = `SELECT 
                            r.resource_id,
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
                    
            const rows = await conn.query(query, [key,user_id,key]);

            return rows;
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },
}

module.exports = FavouriteDAO;