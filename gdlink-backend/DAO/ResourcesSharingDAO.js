const { getConnection } = require('../db');

const ResourceSharingDAO = {
    async shareResource(sharer_id, resource, receivers) {
        const conn = await getConnection();
        try {
            const { category, refName, session, semester, description, owner, link } = resource;
            const sessem = session + '-' + semester;
    
            const query = 'INSERT INTO resources (category, ref_name, sessem, description, owner, link) VALUES (?,?,?,?,?,?)';
            const result = await conn.query(query, [category, refName, sessem, description, owner, link]);
    
            const resource_id = Number(result.insertId);
            const sharingQuery = `INSERT INTO sharing (sharer_id, receiver_id, resource_id) VALUES (?,?,?);`;
            for(let index in receivers){
                await conn.query(sharingQuery, [sharer_id,receivers[index].user_id,resource_id]);
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
    
    async getMySharedResources(sharer_id){
        const conn = await getConnection();
        try {
            const query = `SELECT DISTINCT resources.resource_id,resources.category,
                            resources.description,resources.ref_name 
                            FROM resources INNER JOIN sharing ON resources.resource_id = sharing.resource_id
                            WHERE sharer_id = ? ORDER BY sharing.shared_at DESC;`;
            rows = await conn.query(query,[sharer_id]);
            console.log(rows);
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

    async getResourceDetails(resource_id){
        const conn = await getConnection();
        try {
            const query = `SELECT DISTINCT 
                                resources.resource_id,
                                resources.link, 
                                resources.category,
                                resources.description,
                                resources.ref_name,
                                resources.sessem,
                                resources.owner,
                                sharing.shared_at,
                                users.name
                            FROM 
                                resources
                            INNER JOIN 
                                sharing ON resources.resource_id = sharing.resource_id
                            INNER JOIN 
                                users ON sharing.sharer_id = users.user_id
                            WHERE 
                                resources.resource_id = ?;`;
            rows = await conn.query(query,[resource_id]);
            console.log(rows);
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
    }
    
} 

module.exports = ResourceSharingDAO;

