const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const GroupDAO = {
    async getGroupList(userId){
        const conn = await getConnection();
        try{
            const query = 'SELECT * FROM groups WHERE creator = ?;';
            const rows = await conn.query(query,[userId]);
            return rows.map(snakeToCamel);
        }catch(error){
            console.error('Error occurred while retrieving groups:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving groups. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async createGroup(userId,group){
        const conn = await getConnection();
        try{
            const query = 'INSERT INTO groups(group_name,creator) VALUES (?,?)';
            const result = await conn.query(query,[group.groupName,userId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Group created successfully.' };
            } else {
                return { success: false, message: 'Failed to create group. Please try again.' };
            }
        }catch(error){
            console.error('Error occurred while creating group:', error);
            return {
                error: true,
                message: 'An error occurred while creating group. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async updateGroup(group){
        const conn = await getConnection();
        try{
            const query = 'UPDATE groups SET group_name = ? WHERE group_id = ?';
            const result = await conn.query(query,[group.groupName,group.groupId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Group updated successfully.' };
            } else {
                return { success: false, message: 'Failed to update group. Please try again.' };
            }
        }catch(error){
            console.error('Error occurred while updating group:', error);
            return {
                error: true,
                message: 'An error occurred while updating group. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async deleteGroup(groupId){
        const conn = await getConnection();
        try{
            const query = 'Delete FROM groups WHERE group_id = ?';
            const result = await conn.query(query,[groupId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Group delete successfully.' };
            } else {
                return { success: false, message: 'Failed to delete group. Please try again.' };
            }
        }catch(error){
            console.error('Error occurred while deleting group:', error);
            return {
                error: true,
                message: 'An error occurred while deleting group. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },
}

module.exports = GroupDAO;
