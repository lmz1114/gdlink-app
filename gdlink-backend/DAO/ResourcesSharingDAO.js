const { getConnection } = require('../db');

const ResourceSharingDAO = {
    async getChartData(user_id,user_id_type){
        const conn = await getConnection();
        try {
            let query = `SELECT 
                                category.category_name, 
                                category.color AS category_color, 
                                COUNT(*) AS category_count
                            FROM 
                                resources 
                            INNER JOIN 
                                category 
                            ON 
                                resources.category_id = category.category_id`;
            if(user_id_type === 'receiver_id'){
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id`
            }
            query += ` WHERE ${user_id_type} = ? GROUP BY category_name;`;
            rows = await conn.query(query,[user_id]);
            const updatedRows = rows.map(row => {
                row.category_count = Number(row.category_count);
                return row;
            });
            return updatedRows;
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

    async shareResource(sharer_id, resource, receivers) {
        const conn = await getConnection();
        try {
            const { category_id, refName, session, semester, description, owner, link } = resource;
            const sessem = session + '-' + semester;
    
            const query = 'INSERT INTO resources (category_id, ref_name, sessem, description, owner, link, sharer_id) VALUES (?,?,?,?,?,?,?)';
            const result = await conn.query(query, [category_id, refName, sessem, description, owner, link, sharer_id]);
    
            const resource_id = Number(result.insertId);
            const sharingQuery = `INSERT INTO sharing (receiver_id, resource_id) VALUES (?,?);`;
            for(let index in receivers){
                await conn.query(sharingQuery, [receivers[index].user_id,resource_id]);
            }
    
            return {
                resource_id: resource_id
            };
        } catch (error) {
            console.error('Error occurred while sharing resource:', error);
            return {
                error: true,
                message: 'An error occurred while sharing the resource. Please try again later.',
            };
        } finally {
            conn.release(); 
        }
    },

    async getRecentAccessResources(user_id){
        const conn = await getConnection();
        try {
               const query = `SELECT sharing.latest_access_time, 
                                    resources.resource_id, 
                                    category.color, 
                                    resources.description, 
                                    resources.ref_name, 
                                    'receive' AS resource_type
                                FROM sharing
                                INNER JOIN resources ON resources.resource_id = sharing.resource_id
                                INNER JOIN category ON resources.category_id = category.category_id
                                WHERE receiver_id = ? 
                                AND sharing.latest_access_time >= CURDATE() - INTERVAL 7 DAY
                                UNION 
                                SELECT resources.latest_access_time, 
                                    resources.resource_id, 
                                    category.color, 
                                    resources.description, 
                                    resources.ref_name, 
                                    'share' AS resource_type
                                FROM resources
                                INNER JOIN category ON resources.category_id = category.category_id
                                WHERE sharer_id = ? 
                                AND resources.latest_access_time >= CURDATE() - INTERVAL 7 DAY
                                ORDER BY latest_access_time DESC;`;
                rows = await conn.query(query,[user_id,user_id]);
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

    
    async getMyShareLinksResources(sharer_id){
        const conn = await getConnection();
        try {
            const query = `SELECT resources.resource_id,category.color,
                            resources.description,resources.ref_name 
                            FROM resources INNER JOIN category ON resources.category_id = category.category_id WHERE sharer_id = ? ORDER BY shared_at DESC;`;
            rows = await conn.query(query,[sharer_id]);
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

    async getSharedWithMeResources(receiver_id){
        const conn = await getConnection();
        try {
            const query = `SELECT resources.resource_id,category.color,
                            resources.description,resources.ref_name 
                            FROM resources INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                            INNER JOIN category ON resources.category_id = category.category_id WHERE receiver_id = ? ORDER BY resources.shared_at DESC;`;
            rows = await conn.query(query,[receiver_id]);
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

    async getFilteredResources(user_id,user_id_type,categories,semesters){
        const conn = await getConnection();
        try {
            let query = `SELECT resources.resource_id,category.color,
                            resources.description,resources.ref_name 
                            FROM resources`;
            let queryParams = [user_id];

            if (user_id_type === 'receiver_id') {
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id`;
            }
    
            query += ` INNER JOIN category ON resources.category_id = category.category_id
                       WHERE ${user_id_type} = ?`;
    
            if (categories && categories.length > 0) {
                query += ' AND category.category_name IN (?)';
                queryParams.push(categories);
            }
    
            if (semesters && semesters.length > 0) {
                query += ' AND sessem IN (?)';
                queryParams.push(semesters);
            }

            query += ' ORDER BY shared_at DESC;'
    
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

    async getSearchedResources(user_id,user_id_type,key){
        const conn = await getConnection();
        try {
            let query = `SELECT 
                            resources.resource_id,
                            category.color,
                            resources.description,
                            resources.ref_name,
                            MATCH(resources.ref_name, resources.description) AGAINST(?) AS relevance
                        FROM 
                            resources`;

            if (user_id_type === 'receiver_id') {
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id`;
            }
    
            query += ` INNER JOIN category ON resources.category_id = category.category_id
                        WHERE 
                            ${user_id_type} = ? 
                            AND MATCH(resources.ref_name, resources.description) AGAINST(?)
                        ORDER BY 
                            relevance DESC;`;
    
            const rows = await conn.query(query, [key,user_id,key]);
            console.log(rows);
            return rows;
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },

    async getResourceDetails(resource_id, receiver_id = null) {
        const conn = await getConnection();
        try {
            let query;
            let queryParams = [resource_id];
    
            if (receiver_id) {
                query = `SELECT
                            resources.resource_id,
                            resources.link, 
                            resources.description,
                            resources.ref_name,
                            resources.sessem,
                            DATE_FORMAT(resources.shared_at, '%d/%m/%Y %r') AS shared_at,
                            users.name AS sharer_name,
                            category.category_name,
                            category.color
                        FROM 
                            resources
                        INNER JOIN 
                            users ON resources.sharer_id = users.user_id
                        INNER JOIN
                            category ON category.category_id = resources.category_id
                        INNER JOIN
                            sharing ON resources.resource_id = sharing.resource_id
                        WHERE 
                            resources.resource_id = ? AND sharing.receiver_id = ?`;
                queryParams.push(receiver_id);
            } else {
                query = `SELECT
                            resources.resource_id,
                            resources.link, 
                            resources.description,
                            resources.ref_name,
                            resources.sessem,
                            resources.owner,  
                            DATE_FORMAT(resources.shared_at, '%d/%m/%Y %r') AS shared_at,
                            category.category_name,
                            category.color
                        FROM 
                            resources
                        INNER JOIN 
                            users ON resources.sharer_id = users.user_id
                        INNER JOIN
                            category ON category.category_id = resources.category_id
                        WHERE 
                            resources.resource_id = ?`;
            }
    
            const rows = await conn.query(query, queryParams);
            return rows;
        } catch (error) {
            console.error('Error occurred while retrieving resources:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.',
            };
        } finally {
            conn.release();
        }
    },

    async updateAccessTime(resource_id, receiver_id = null) {
        const conn = await getConnection();
        try {
            const accessTime = new Date();
            if(receiver_id){
                const receiverQuery = `UPDATE sharing SET latest_access_time = ? WHERE resource_id = ? AND receiver_id = ?`;
                await conn.query(receiverQuery, [accessTime, resource_id, receiver_id]);
            }else{
                const query = `UPDATE resources SET latest_access_time = ? WHERE resource_id = ?`;
                await conn.query(query, [accessTime, resource_id, receiver_id]);
            }
        } catch (error) {
            console.error('Error occurred while updating access time:', error);
        } finally {
            conn.release();
        }
    }
    
    
    
} 

module.exports = ResourceSharingDAO;

