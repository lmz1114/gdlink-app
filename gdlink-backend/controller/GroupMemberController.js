const GroupMemberService = require('../service/GroupMemberService');

const GroupMemberController = {
    async getMemberList(req,res){
        const groupId = req.params.groupId;
        try{
            const memberList = await GroupMemberService.getMemberList(groupId);
            return res.json(memberList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the members',
              error: error.message, 
            });
        }
    },

    async addMember(req,res){
        const groupId = req.params.groupId;
        const memberEmail = req.body.memberEmail;
        if (!memberEmail || memberEmail.trim() === '') {
            return res.json({ success: false, message: 'Input field cannot be empty.' });
        }
        try{
            const result = await GroupMemberService.addMember(groupId,memberEmail);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while adding the member',
              error: error.message, 
            });
        }
    },

    async updateMemberRole(req,res){
        const groupMember = req.body.groupMember;
        try{
            const result = await GroupMemberService.updateMemberRole(groupMember);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while updating the role',
              error: error.message, 
            });
        }
    },

    async removeMember(req,res){
        const groupMemberId = req.params.groupMemberId;
        try{
            const result = await GroupMemberService.removeMember(groupMemberId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while removing the member',
              error: error.message, 
            });
        }
    },
}

module.exports = GroupMemberController;