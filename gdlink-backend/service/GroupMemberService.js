const GroupMemberDAO = require('../DAO/GroupMemberDAO');

const GroupMemberService = {
    async getMemberList(groupId){
        try{
            return await GroupMemberDAO.getMemberList(groupId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the members. Please try again later.'
            };
        }
    },

    async addMember(groupId,memberEmail){
        try{
            return await GroupMemberDAO.addMember(groupId,memberEmail);
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while adding the member. Please try again later.'
            };
        }
    },

    async updateMemberRole(groupMember){
        try{
            return await GroupMemberDAO.updateMemberRole(groupMember);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while updating the role. Please try again later.'
            };
        }
    },

    async removeMember(groupMemberId){
        try{
            return await GroupMemberDAO.removeMember(groupMemberId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while removing the member. Please try again later.'
            };
        }
    },
}

module.exports = GroupMemberService;