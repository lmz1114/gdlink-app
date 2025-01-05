const express = require('express');
const GroupMemberController = require('../controller/GroupMemberController');

const router = express.Router();

router.get('/:groupId', GroupMemberController.getMemberList); 
router.post('/:groupId/add', GroupMemberController.addMember); 
router.put('/edit', GroupMemberController.updateMemberRole);
router.delete('/:groupMemberId/delete', GroupMemberController.removeMember); 

module.exports = router;