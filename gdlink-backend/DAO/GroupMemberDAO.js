const { getConnection } = require('../db');
const {snakeToCamel} = require('../tools/camelTransform');

const GroupMemberDAO = {
    async getMemberList(groupId){
        const conn = await getConnection();
        try{
            const query = `SELECT 
                                gm.group_member_id,
                                u.name ,
                                gm.role,
                                gm.member_id
                            FROM 
                                group_members gm
                            JOIN 
                                users u 
                            ON 
                                gm.member_id = u.user_id
                            WHERE 
                                gm.group_id = ?;`;
            const rows = await conn.query(query,[groupId]);
            return rows.map(snakeToCamel);
        }catch(error){
            console.error('Error occurred while retrieving group members:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving group members. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async addMember(groupId,memberId){
        const conn = await getConnection();
        try{
            const query = 'INSERT INTO group_members(group_id,member_id) VALUES (?,?)';
            const result = await conn.query(query,[groupId,memberId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Member added successfully.' };
            } else {
                return { success: false, message: 'Failed to add member. Please try again.' };
            }
        }catch(error){
            if (error.errno === 1452 || error.code === 'ER_NO_REFERENCED_ROW_2') {
                return { success: false, message: 'User ID does not exist.'}
            }
            console.error('Error occurred while adding member:', error);
            return {
                error: true,
                message: 'An error occurred while adding member. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async updateMemberRole(groupMember){
        const conn = await getConnection();
        try{
            const query = 'UPDATE group_members SET role = ? WHERE group_member_id = ?';
            const result = await conn.query(query,[groupMember.role, groupMember.groupMemberId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Role updated successfully.' };
            } else {
                return { success: false, message: 'Failed to update role. Please try again.' };
            }
        }catch(error){
            console.error('Error occurred while updating role:', error);
            return {
                error: true,
                message: 'An error occurred while updating role. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async removeMember(groupMemberId){
        const conn = await getConnection();
        try{
            const query = 'Delete FROM group_members WHERE group_member_id = ?';
            const result = await conn.query(query,[groupMemberId]);
            if (result.affectedRows > 0) {
                return { success: true, message: 'Member removed successfully.' };
            } else {
                return { success: false, message: 'Failed to remove member. Please try again.' };
            }
        }catch(error){
            console.error('Error occurred while removing member:', error);
            return {
                error: true,
                message: 'An error occurred while removing member. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    },

    async getMembersIdByGroup(groupId){
        const conn = await getConnection();
        try{
            const query = `SELECT member_id AS user_id FROM group_members WHERE group_id = ?;`;
            const rows = await conn.query(query,[groupId]);
            return rows.map(snakeToCamel);
        }catch(error){
            console.error('Error occurred while retriving members\' ids:', error);
            return {
                error: true,
                message: 'An error occurred while retriving members\' ids:. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }
    }
}

module.exports = GroupMemberDAO;