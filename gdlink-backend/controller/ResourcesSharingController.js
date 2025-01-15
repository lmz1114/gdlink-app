const ResourcesSharingService = require('../service/ResourcesSharingService');

const ResourcesSharingController = {
    async getMyShareLinksChartData(req,res){
        try{
            const sharerId = req.params.userId;

            const resourceList = await ResourcesSharingService.getChartData(sharerId,'sharer_id');
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getMySharedWithMeChartData(req,res){
        try{
            const receiverId = req.params.userId;

            const resourceList = await ResourcesSharingService.getChartData(receiverId,'receiver_id');
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async shareResource(req,res){
        try{
            const sharerId = req.params.userId;
            const {resource} = req.body;
            console.log(resource);
            const result = await ResourcesSharingService.shareResource(sharerId, resource);
            res.status(201).json({
                message: 'Resource shared successfully',
                ...result,
            });
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while sharing the resource',
              error: error.message, 
            });
        }
    },

    async editResource(req,res){
        try{
            const sharerId = req.params.userId;
            const resourceId = req.params.resourceId;
            const {resource,previousShareTo,previousReceiverGroups,previousReceivers} = req.body;
            console.log(resource);
            const result = await ResourcesSharingService.editResource(sharerId,resourceId,previousShareTo,previousReceiverGroups,previousReceivers,resource);
            res.status(201).json({
                message: 'Resource shared successfully',
                ...result,
            });
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while sharing the resource',
              error: error.message, 
            });
        }
    },

    async deleteResource(req, res) {
        try {
            const resourceId = req.params.resourceId;
            const result = await ResourcesSharingService.deleteResource(resourceId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while deleting the resource',
                error: error.message,
            });
        }
    },

    async getMyShareLinksResources(req,res){
        try{
            const sharerId = req.params.userId;
            const resourceList = await ResourcesSharingService.getMyShareLinksResources(sharerId);
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSharedWithMeResources(req,res){
        try{
            const receiverId = req.params.userId;
            const resourceList = await ResourcesSharingService.getSharedWithMeResources(receiverId);
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getFilteredMyShareLinksResources(req,res){
        try{
            const sharerId = req.params.userId;
            const {categories, semesters} = req.body;
            const filteredResourceList = await ResourcesSharingService.getFilteredResources(sharerId,"sharer_id",categories,semesters);
            return res.json(filteredResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getFilteredSharedWithMeResources(req,res){
        try{
            const receiverId = req.params.userId;
            const {categories, semesters} = req.body;
            const filteredResourceList = await ResourcesSharingService.getFilteredResources(receiverId,"receiver_id",categories,semesters);
            return res.json(filteredResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSearchedMyShareLinksResources(req,res){
        try{
            const sharerId = req.params.userId;
            const {key} = req.body;
            const searchedResourceList = await ResourcesSharingService.getSearchedResources(sharerId,"sharer_id",key);
            return res.json(searchedResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSearchedSharedWithMeResources(req,res){
        try{
            const receiverId = req.params.userId;
            const {key} = req.body;
            const searchedResourceList = await ResourcesSharingService.getSearchedResources(receiverId,"receiver_id",key);
            return res.json(searchedResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getMyShareLinksResourceDetails(req,res){
        try{
            const resourceId = req.params.resourceId;
            const resource = await ResourcesSharingService.getResourceDetails(resourceId);
            return res.json(resource);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSharedWithMeResourceDetails(req,res){
        try{
            const resourceId = req.params.resourceId;
            const receiverId = req.params.userId;

            const resource = await ResourcesSharingService.getResourceDetails(resourceId,receiverId);
            return res.json(resource);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },

    async getAllResources(req,res){
        try{
            const resource = await ResourcesSharingService.getAllResources();
            return res.json(resource);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    }
}

module.exports = ResourcesSharingController;