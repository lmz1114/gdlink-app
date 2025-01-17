const express = require('express');
const ResourcesSharingController = require('../controller/ResourcesSharingController');

const router = express.Router();

// Routes
router.get('/my_sharelink/:userId', ResourcesSharingController.getMyShareLinksResources); 
router.get('/shared_with_me/:userId', ResourcesSharingController.getSharedWithMeResources); 

router.post('/my_sharelink/:userId/filter', ResourcesSharingController.getFilteredMyShareLinksResources);
router.post('/shared_with_me/:userId/filter', ResourcesSharingController.getFilteredSharedWithMeResources);

router.post('/my_sharelink/:userId/search', ResourcesSharingController.getSearchedMyShareLinksResources); 
router.post('/shared_with_me/:userId/search', ResourcesSharingController.getSearchedSharedWithMeResources);

router.get('/:resourceId', ResourcesSharingController.getMyShareLinksResourceDetails); 
router.get('/:resourceId/:userId', ResourcesSharingController.getSharedWithMeResourceDetails); 

router.post('/share/:userId', ResourcesSharingController.shareResource); 
router.delete('/delete/:userId/:resourceId', ResourcesSharingController.deleteResource); //add userid param to get username for message
router.put('/edit/:userId/:resourceId', ResourcesSharingController.editResource)

router.get('/', ResourcesSharingController.getAllResources); 


module.exports = router;
