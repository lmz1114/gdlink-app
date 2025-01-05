const express = require('express');
const GroupController = require('../controller/GroupController');

const router = express.Router();

router.get('/:userId', GroupController.getGroupList); 
router.post('/:userId/add', GroupController.createGroup); 
router.put('/edit', GroupController.updateGroup);
router.delete('/:groupId/delete', GroupController.deleteGroup); 

module.exports = router;