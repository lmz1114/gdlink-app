const express = require('express');
const ResourcesSharingController = require('../controller/ResourcesSharingController');

const router = express.Router();

// Routes
router.get('/my_sharelink/:user_id', ResourcesSharingController.getMyShareLinksResources); 
router.get('/shared_with_me/:user_id', ResourcesSharingController.getSharedWithMeResources); 

router.post('/my_sharelink/:user_id/filter', ResourcesSharingController.getFilteredMyShareLinksResources);
router.post('/shared_with_me/:user_id/filter', ResourcesSharingController.getFilteredSharedWithMeResources);

router.post('/my_sharelink/:user_id/search', ResourcesSharingController.getSearchedMyShareLinksResources); 
router.post('/shared_with_me/:user_id/search', ResourcesSharingController.getSearchedSharedWithMeResources);

router.get('/:resource_id', ResourcesSharingController.getMyShareLinksResourceDetails); 
router.get('/:resource_id/:user_id', ResourcesSharingController.getSharedWithMeResourceDetails); 

router.post('/share/:user_id', ResourcesSharingController.shareResource); 

module.exports = router;
