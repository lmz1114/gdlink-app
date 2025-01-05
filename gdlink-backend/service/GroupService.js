const GroupDAO = require('../DAO/GroupDAO');

const GroupService = {
    async getGroupList(userId){
        try{
            return await GroupDAO.getGroupList(userId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the groups. Please try again later.'
            };
        }
    },

    async createGroup(userId,group){
        try{
            return await GroupDAO.createGroup(userId,group);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while creating the group. Please try again later.'
            };
        }
    },

    async updateGroup(group){
        try{
            return await GroupDAO.updateGroup(group);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while updating the groups. Please try again later.'
            };
        }
    },

    async deleteGroup(groupId){
        try{
            return await GroupDAO.deleteGroup(groupId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while deleting the groups. Please try again later.'
            };
        }
    },
}

module.exports = GroupService;