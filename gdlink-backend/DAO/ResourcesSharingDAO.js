const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const ResourceSharingDAO = {

    async getReceiverEmails(resourceId) {
        const conn = await getConnection();
        try {
            const query = `SELECT receiver_email AS email FROM sharing WHERE resource_id = ?;`;
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

    //new added (find username for message)
     async getUserNameById(userId) {
        const conn = await getConnection();
        try {
            const query = `SELECT name FROM users WHERE user_id = ?`;
            const rows = await conn.query(query, [userId]);

        
            if (rows && rows.length > 0) {
                const user = snakeToCamel(rows[0]); 
                return user.name; 
            }
            return ''; // Return an empty string if no user is found
        } catch (error) {
            console.error('Error fetching user name:', error.message);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    },

    //new added(find resource refname of resource for message)
    async getRefNameById(resourceId) {
        const conn = await getConnection();
        try {
            const query = `SELECT ref_name FROM resources WHERE resource_id = ?`;
            const rows = await conn.query(query, [resourceId]);

            if (rows && rows.length > 0) {
                const resource = snakeToCamel(rows[0]);
                return resource.refName; 
            }
            return ''; 
        } catch (error) {
            console.error('Error fetching resource name:', error.message);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    },

    async deleteSharesWithIN(resourceId, userEmailsToRemove) {
        const conn = await getConnection();
        try {
            const query = `DELETE FROM sharing WHERE resource_id = ? AND receiver_email IN (?)`;
            const affectedRows = await conn.query(query, [resourceId,userEmailsToRemove]);
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
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                            INNER JOIN users ON sharing.receiver_email = users.email`;
                userIdType = 'users.user_id'
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
            const { categoryId, refName, session, semester, description, link, shareTo, receiverGroups } = resource;
            const sessem = session + '-' + semester;
    
            const query = 'INSERT INTO resources (category_id, ref_name, sessem, description, link, share_to, sharer_id) VALUES (?,?,?,?,?,?,?)';
            const result = await conn.query(query, [categoryId, refName, sessem, description, link, shareTo, sharerId]);
    
            const resourceId = Number(result.insertId);
    
            if (resourceId <= 0) {
                throw new Error('Failed to insert resource into database.');
            }
    
            if (receiverGroups) {
                const groupShareQuery = 'INSERT INTO group_sharing (group_id, resource_id) VALUES (?,?);';
                for (let groupId of receiverGroups) {
                    const groupResult = await conn.query(groupShareQuery, [groupId, resourceId]);
                    if (groupResult.affectedRows <= 0) {
                        throw new Error(`Failed to share resource with group ID: ${groupId}`);
                    }
                }
            }

            console.log(receivers);
    
            const sharingQuery = `INSERT INTO sharing (receiver_email, resource_id) VALUES (?,?);`;
            for (let receiver of receivers) {
                const sharingResult = await conn.query(sharingQuery, [receiver.email, resourceId]);
                if (sharingResult.affectedRows <= 0) {
                    throw new Error(`Failed to share resource with receiver email: ${receiver.email}`);
                }
            }
    
            return {
                resourceId: resourceId,
                success: true,
                message: 'Resource shared successfully.',
            };
        } catch (error) {
            console.error('Error occurred while sharing resource:', error);
            return {
                success: false,
                message: error.message || 'An error occurred while sharing the resource. Please try again later.',
            };
        } finally {
            conn.release();
        }
    },
    

    async editResource(resourceId, resource, isReceiverGroupsSame, previousReceiverGroups, usersToAdd) {
        const conn = await getConnection();
        try {
            const { categoryId, refName, session, semester, description, link, shareTo, receiverGroups } = resource;
            const sessem = session + '-' + semester;
    
            const query = `UPDATE resources
                            SET 
                                category_id = ?, 
                                ref_name = ?, 
                                sessem = ?, 
                                description = ?, 
                                link = ?, 
                                shared_at = NOW(), 
                                share_to = ?
                            WHERE resource_id = ?;`;
            
            const result = await conn.query(query, [categoryId, refName, sessem, description, link, shareTo, resourceId]);
            
            // Check if any row was affected by the update
            if (result.affectedRows <= 0) {
                throw new Error('Resource update failed.');
            }
    
            // Handle receiver group changes
            if (!isReceiverGroupsSame) {
                if (previousReceiverGroups.length > 0) {
                    const deletePreviousGroupShareQuery = 'DELETE FROM group_sharing WHERE resource_id = ? AND group_id IN (?);';
                    const deleteResult = await conn.query(deletePreviousGroupShareQuery, [resourceId, previousReceiverGroups]);
    
                    if (deleteResult.affectedRows <= 0) {
                        throw new Error('Failed to remove previous group shares.');
                    }
                }
    
                const groupShareQuery = 'INSERT INTO group_sharing (group_id, resource_id) VALUES (?,?);';
                for (let groupId of receiverGroups) {
                    const groupResult = await conn.query(groupShareQuery, [groupId, resourceId]);
                    if (groupResult.affectedRows <= 0) {
                        throw new Error(`Failed to share resource with group ID: ${groupId}`);
                    }
                }
            }

            console.log(usersToAdd);
    
            // Insert users to be added
            const sharingQuery = `INSERT INTO sharing (receiver_email, resource_id) VALUES (?,?);`;
            for (let receiver of usersToAdd) {
                const sharingResult = await conn.query(sharingQuery, [receiver.email, resourceId]);
                if (sharingResult.affectedRows <= 0) {
                    throw new Error(`Failed to share resource with receiver ID: ${receiver.email}`);
                }
            }
    
            return {
                success: true,
                message: 'Resource updated and shared successfully.',
            };
        } catch (error) {
            console.error('Error occurred while editing resource:', error);
            return {
                success: false,
                message: error.message || 'An error occurred while editing the resource. Please try again later.',
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
                                INNER JOIN users ON sharing.receiver_email = users.email 
                                WHERE users.user_id = ? 
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
                            resources.description,resources.ref_name,
                            resources.share_to
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
                                resources.description,resources.ref_name,sharer.name AS owner
                            FROM resources INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                                INNER JOIN category ON resources.category_id = category.category_id
                                INNER JOIN users receiver ON sharing.receiver_email = receiver.email 
                                INNER JOIN users sharer ON resources.sharer_id = sharer.user_id
                            WHERE receiver.user_id = ? ORDER BY resources.shared_at DESC;`;
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
                            resources.description,resources.ref_name,resources.share_to`;
            let queryParams = [userId];

            if (userIdType === 'receiver_id') {
                query += ` ,sharer.name AS owner`;
            }

            query += ` FROM resources`;

            if (userIdType === 'receiver_id') {
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                            INNER JOIN users receiver ON sharing.receiver_email = receiver.email 
                            INNER JOIN users sharer ON resources.sharer_id = sharer.user_id`;
                userIdType = 'receiver.user_id';
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
                            resources.share_to`;

            if (userIdType === 'receiver_id') {
                query += ` ,sharer.name AS owner`;
            }

            query += ` FROM resources`;

            if (userIdType === 'receiver_id') {
                query += ` INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                             INNER JOIN users receiver ON sharing.receiver_email = receiver.email 
                            INNER JOIN users sharer ON resources.sharer_id = sharer.user_id`;
                userIdType = 'receiver.user_id';
            }
    
            query += ` INNER JOIN category ON resources.category_id = category.category_id
                        WHERE 
                            ${userIdType} = ? 
                            AND (resources.ref_name LIKE ? 
                             OR resources.description LIKE ?)
                        `;
    
            const searchKey = `%${key}%`;
            const rows = await conn.query(query, [userId,searchKey,searchKey]);
            return rows.map(snakeToCamel);;
        } catch (error) {
            console.error('Error fetching searched resources:', error);
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
                            sharer.name AS sharer_name,
                            category.category_name,
                            category.color,
                            receiver.name AS receiver_name
                        FROM 
                            resources
                        INNER JOIN 
                            users AS sharer ON resources.sharer_id = sharer.user_id
                        INNER JOIN
                            category ON category.category_id = resources.category_id
                        INNER JOIN
                            sharing ON resources.resource_id = sharing.resource_id
                        INNER JOIN
                            users AS receiver ON sharing.receiver_email = receiver.email
                        WHERE 
                            resources.resource_id = ? 
                            AND receiver.user_id = ?;
                        `;
                queryParams.push(receiverId);
            } else {
                query = `SELECT
                            resources.resource_id,
                            resources.link, 
                            resources.description,
                            resources.ref_name,
                            resources.sessem,
                            resources.share_to, 
                            DATE_FORMAT(resources.shared_at, '%d/%m/%Y %r') AS shared_at,
                            category.category_id,
                            category.category_name,
                            category.color,
                            groups.group_id,
                            groups.group_name,  
                            sharing.receiver_email,
                            receiver.name AS receiver_name, 
                            sharer.name AS sharer_name,
                            sharer.role AS sharer_role 
                        FROM 
                            resources
                        INNER JOIN 
                            users AS sharer ON resources.sharer_id = sharer.user_id
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
                            users AS receiver ON sharing.receiver_email = receiver.email  
                        WHERE 
                            resources.resource_id = ?;`;
            }
    
            const rows = await conn.query(query, queryParams);

            console.log(rows);
            
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
                const receiverQuery = `UPDATE sharing 
                                        INNER JOIN users ON sharing.receiver_email = users.email
                                        SET sharing.latest_access_time = ?
                                        WHERE sharing.resource_id = ? 
                                        AND users.user_id = ?;`;
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
    },

    async getAllResources() {
        const conn = await getConnection();
        try {
            let query;
                query = `SELECT
                            resources.resource_id,
                            resources.link, 
                            resources.description,
                            resources.ref_name,
                            resources.sessem,
                            DATE_FORMAT(resources.shared_at, '%d/%m/%Y %r') AS shared_at,
                            category.category_name,
                            category.color,
                            users.name AS owner
                        FROM 
                            resources
                        INNER JOIN 
                            users ON resources.sharer_id = users.user_id
                        INNER JOIN
                            category ON category.category_id = resources.category_id`;
            
            const rows = await conn.query(query);
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

    async getFilteredAllResources(categories,semesters){
        const conn = await getConnection();
        try {
            let query = `SELECT
                            resources.resource_id,
                            resources.link, 
                            resources.description,
                            resources.ref_name,
                            resources.sessem,
                            DATE_FORMAT(resources.shared_at, '%d/%m/%Y %r') AS shared_at,
                            category.category_name,
                            category.color,
                            users.name AS owner
                        FROM 
                            resources
                        INNER JOIN 
                            users ON resources.sharer_id = users.user_id
                        INNER JOIN
                            category ON category.category_id = resources.category_id
                        WHERE 1=1`;

            let queryParams = [];
    
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

    async getSearchedAllResources(key){
        const conn = await getConnection();
        try {
            let query = `SELECT 
                            resources.resource_id,
                            resources.sessem,
                            category.category_name, 
                            category.color,
                            resources.description,
                            resources.ref_name,
                            users.name AS owner
                        FROM 
                            resources 
                        INNER JOIN 
                            category ON resources.category_id = category.category_id
                        INNER JOIN 
                            users ON resources.sharer_id = users.user_id
                        WHERE 
                            (resources.ref_name LIKE ? 
                             OR resources.description LIKE ?)
                        `;
    
            const searchKey = `%${key}%`;
            const rows = await conn.query(query, [searchKey,searchKey]);
            return rows.map(snakeToCamel);
        } catch (error) {
            console.error('Error fetching searched resources:', error);
            throw error; 
        }finally{
            conn.release();
        }
    },

    async initResources(userEmail, userRole) {
        const conn = await getConnection();
        console.log("role: " + userRole + ",  email: " + userEmail);
        try {
            const shareToConditions = ['all']; 
        
            if (userRole.includes('Pelajar')) {
                shareToConditions.push('students');  
            } else if (userRole === 'Pensyarah') {
                shareToConditions.push('lecturers');  
            } 
    
            const query = `
                INSERT INTO sharing (receiver_email, resource_id)
                SELECT ?, r.resource_id
                FROM resources r
                WHERE r.share_to IN (?);
            `;
            
            await conn.query(query, [userEmail, shareToConditions]);
            console.log(`User sharing initialized for resources shared to "${shareToConditions.join(', ')}".`);
        } catch (error) {
            console.error('Error occurred while initializing user sharing:', error);
            throw new Error('Error initializing user sharing.');
        } finally {
            conn.release();
        }
    }  
}

module.exports = ResourceSharingDAO;

