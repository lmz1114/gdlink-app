const GroupService = require('../service/GroupService');

const GroupController = {
    async getGroupList(req,res){
        const userId = req.params.userId;
        try{
            const groupList = await GroupService.getGroupList(userId);
            return res.json(groupList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the groups',
              error: error.message, 
            });
        }
    },

    async createGroup(req,res){
        const userId = req.params.userId;
        const group = req.body.group;
        try{
            const result = await GroupService.createGroup(userId,group);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the groups',
              error: error.message, 
            });
        }
    },

    async updateGroup(req,res){
        const group = req.body.group;
        try{
            const result = await GroupService.updateGroup(group);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while updating the group',
              error: error.message, 
            });
        }
    },

    async deleteGroup(req,res){
        const groupId = req.params.groupId;
        try{
            const result = await GroupService.deleteGroup(groupId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while deleting the group',
              error: error.message, 
            });
        }
    },
}

module.exports = GroupController;