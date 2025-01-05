const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const ResourceSharingDAO = {

    async getReceiverIds(resourceId) {
        const conn = await getConnection();
        try {
            const query = `SELECT receiver_id AS user_id FROM sharing WHERE resource_id = ?;`;
            const rows = await conn.query(query, [resourceId]);
            return rows.map(snakeToCamel);
           
        } catch (error) {
            console.error('DAO Error', error);
            return {
                error: true,
                message: 'An error occurred while retrieving receiver.',
            };
        } finally {
            if (conn) conn.release();
        }
    },

    async deleteSharesWithIN(resourceId, userIdsToRemove) {
        const conn = await getConnection();
        try {
            const query = `DELETE FROM sharing WHERE resource_id = ? AND receiver_id IN (?)`;
            const affectedRows = await conn.query(query, [resourceId,userIdsToRemove]);
            console.log(affectedRows);
        } catch (error) {
            console.error('DAO Error', error);
            return {
                error: true,
                message: 'An error occurred while deleting receiver.',
            };
        } finally {
            if (conn) conn.release();
        }
    },


    async getChartData(userId,userIdType){
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
            if(userIdType === 'receiver_id'){
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id`
            }
            query += ` WHERE ${userIdType} = ? GROUP BY category_name;`;
            let rows = await conn.query(query,[userId]);
            rows = rows.map(snakeToCamel);
            console.log(rows);
            const updatedRows = rows.map(row => {
                row.categoryCount = Number(row.categoryCount);
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

    async shareResource(sharerId, resource, receivers) {
        const conn = await getConnection();
        try {
            const { categoryId, refName, session, semester, description, owner, link, shareTo, receiverGroups } = resource;
            const sessem = session + '-' + semester;
    
            const query = 'INSERT INTO resources (category_id, ref_name, sessem, description, owner, link, share_to, sharer_id) VALUES (?,?,?,?,?,?,?,?)';
            const result = await conn.query(query, [categoryId, refName, sessem, description, owner, link, shareTo, sharerId]);
    
            const resourceId = Number(result.insertId);
            if(receiverGroups){
                const groupShareQuery = 'INSERT INTO group_sharing (group_id, resource_id) VALUES (?,?);';
                for(let groupId of receiverGroups){
                    await conn.query(groupShareQuery, [groupId, resourceId]);
                }
            }
            const sharingQuery = `INSERT INTO sharing (receiver_id, resource_id) VALUES (?,?);`;
            for(let receiver of receivers){
                await conn.query(sharingQuery, [receiver.userId,resourceId]);
            }
    
            return {
                resourceId: resourceId
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

    async editResource(resourceId, resource, isReceiverGroupsSame, previousReceiverGroups, usersToAdd){
        const conn = await getConnection();
        try {
            const { categoryId, refName, session, semester, description, owner, link, shareTo, receiverGroups } = resource;
            const sessem = session + '-' + semester;
    
            const query = `UPDATE resources
                            SET 
                                category_id = ?, 
                                ref_name = ?, 
                                sessem = ?, 
                                description = ?, 
                                owner = ?, 
                                link = ?, 
                                shared_at = NOW(), 
                                share_to = ?
                            WHERE resource_id = ?;`;
            const result = await conn.query(query, [categoryId, refName, sessem, description, owner, link, shareTo, resourceId]);

            if (!isReceiverGroupsSame) {
                if(previousReceiverGroups.length > 0){
                    const deletePreviousGroupShareQuery2 = 'DELETE FROM group_sharing WHERE resource_id = ? AND group_id IN (?);';
                    await conn.query(deletePreviousGroupShareQuery2, [resourceId, previousReceiverGroups]);
                }
                const groupShareQuery = 'INSERT INTO group_sharing (group_id, resource_id) VALUES (?,?);';
                for (let groupId of receiverGroups) {
                    await conn.query(groupShareQuery, [groupId, resourceId]);
                }
            }

            const sharingQuery = `INSERT INTO sharing (receiver_id, resource_id) VALUES (?,?);`;
            console.log(usersToAdd);
            for(let receiver of usersToAdd){
                await conn.query(sharingQuery, [receiver.userId,resourceId]);
            }
    
            return {
                resourceId: resourceId
            };
        } catch (error) {
            console.error('Error occurred while editing resource:', error);
            return {
                error: true,
                message: 'An error occurred while editing the resource. Please try again later.',
            };
        } finally {
            conn.release(); 
        }
    },

    async deleteResource(resourceId) {
        const conn = await getConnection();
        try {
            const query = `DELETE FROM resources WHERE resource_id = ?;`;
            const result = await conn.query(query, [resourceId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Resource deleted successfully' };
            } else {
                return { success: false, message: 'Resource not found' };
            }
        } catch (error) {
            console.error('DAO Error', error);
            return {
                error: true,
                message: 'An error occurred while deleting the resource.',
            };
        } finally {
            if (conn) conn.release();
        }
    },

    async getRecentAccessResources(userId){
        const conn = await getConnection();
        try {
               const query = `SELECT sharing.latest_access_time, 
                                    resources.resource_id,
                                    resources.sessem,
                                    category.category_name, 
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
                                    resources.sessem,
                                    category.category_name, 
                                    category.color,  
                                    resources.description, 
                                    resources.ref_name, 
                                    'share' AS resource_type
                                FROM resources
                                INNER JOIN category ON resources.category_id = category.category_id
                                WHERE sharer_id = ? 
                                AND resources.latest_access_time >= CURDATE() - INTERVAL 7 DAY
                                ORDER BY latest_access_time DESC;`;
                rows = await conn.query(query,[userId,userId]);
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

    
    async getMyShareLinksResources(sharerId){
        const conn = await getConnection();
        try {
            const query = `SELECT resources.resource_id,resources.sessem,
                                    category.category_name, category.color,
                            resources.description,resources.ref_name 
                            FROM resources INNER JOIN category ON resources.category_id = category.category_id WHERE sharer_id = ? ORDER BY shared_at DESC;`;
            rows = await conn.query(query,[sharerId]);
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

    async getSharedWithMeResources(receiverId){
        const conn = await getConnection();
        try {
            const query = `SELECT resources.resource_id,resources.sessem,
                                    category.category_name, category.color,
                            resources.description,resources.ref_name 
                            FROM resources INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                            INNER JOIN category ON resources.category_id = category.category_id WHERE receiver_id = ? ORDER BY resources.shared_at DESC;`;
            rows = await conn.query(query,[receiverId]);
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

    async getFilteredResources(userId,userIdType,categories,semesters){
        const conn = await getConnection();
        try {
            let query = `SELECT resources.resource_id,resources.sessem,
                            category.category_name, category.color, 
                            resources.description,resources.ref_name 
                            FROM resources`;
            let queryParams = [userId];

            if (userIdType === 'receiver_id') {
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id`;
            }
    
            query += ` INNER JOIN category ON resources.category_id = category.category_id
                       WHERE ${userIdType} = ?`;
    
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
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },

    async getSearchedResources(userId,userIdType,key){
        const conn = await getConnection();
        try {
            let query = `SELECT 
                            resources.resource_id,
                            resources.sessem,
                            category.category_name, 
                            category.color,
                            resources.description,
                            resources.ref_name,
                            MATCH(resources.ref_name, resources.description) AGAINST(?) AS relevance
                        FROM 
                            resources`;

            if (userIdType === 'receiver_id') {
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id`;
            }
    
            query += ` INNER JOIN category ON resources.category_id = category.category_id
                        WHERE 
                            ${userIdType} = ? 
                            AND MATCH(resources.ref_name, resources.description) AGAINST(?)
                        ORDER BY 
                            relevance DESC;`;
    
            const rows = await conn.query(query, [key,userId,key]);
            return rows.map(snakeToCamel);;
        } catch (error) {
            console.error('Error fetching filtered resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },

    async getResourceDetails(resourceId, receiverId = null) {
        const conn = await getConnection();
        try {
            let query;
            let queryParams = [resourceId];
    
            if (receiverId) {
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
                queryParams.push(receiverId);
            } else {
                query = `SELECT
                            resources.resource_id,
                            resources.link, 
                            resources.description,
                            resources.ref_name,
                            resources.sessem,
                            resources.owner, 
                            resources.share_to, 
                            DATE_FORMAT(resources.shared_at, '%d/%m/%Y %r') AS shared_at,
                            category.category_id,
                            category.category_name,
                            category.color,
                            groups.group_id,
                            groups.group_name,  
                            sharing.receiver_id,
                            receiver.name AS receiver_name  
                        FROM 
                            resources
                        INNER JOIN 
                            users ON resources.sharer_id = users.user_id
                        INNER JOIN
                            category ON category.category_id = resources.category_id
                        LEFT JOIN
                            group_sharing ON resources.resource_id = group_sharing.resource_id
                            AND resources.share_to = 'specific groups'  
                        LEFT JOIN
                            groups ON group_sharing.group_id = groups.group_id  
                        LEFT JOIN
                            sharing ON resources.resource_id = sharing.resource_id
                            AND resources.share_to = 'specific users'  
                        LEFT JOIN
                            users AS receiver ON sharing.receiver_id = receiver.user_id  
                        WHERE 
                            resources.resource_id = ?;`;
            }
    
            const rows = await conn.query(query, queryParams);
            
            return rows.map(snakeToCamel);
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

    async updateAccessTime(resourceId, receiverId = null) {
        const conn = await getConnection();
        try {
            const accessTime = new Date();
            if(receiverId){
                const receiverQuery = `UPDATE sharing SET latest_access_time = ? WHERE resource_id = ? AND receiver_id = ?`;
                await conn.query(receiverQuery, [accessTime, resourceId, receiverId]);
            }else{
                const query = `UPDATE resources SET latest_access_time = ? WHERE resource_id = ?`;
                await conn.query(query, [accessTime, resourceId, receiverId]);
            }
        } catch (error) {
            console.error('Error occurred while updating access time:', error);
        } finally {
            conn.release();
        }
    }
} 

module.exports = ResourceSharingDAO;

