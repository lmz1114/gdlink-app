const express = require('express');
const ResourcesSharingController = require('../controller/ResourcesSharingController');

const router = express.Router();

// Routes
router.get('/my_sharelink/:user_id', ResourcesSharingController.getMySharedResources); 
router.get('/:resource_id', ResourcesSharingController.getResourceDetails); 
router.post('/share/:user_id', ResourcesSharingController.shareResource); 

module.exports = router;
