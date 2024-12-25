const ResourcesSharingService = require('../service/ResourcesSharingService');

const ResourcesSharingController = {
    async getMyShareLinksChartData(req,res){
        try{
            const sharer_id = req.params.user_id;

            const resourceList = await ResourcesSharingService.getChartData(sharer_id,'sharer_id');
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
            const receiver_id = req.params.user_id;

            const resourceList = await ResourcesSharingService.getChartData(receiver_id,'receiver_id');
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
            const sharer_id = req.params.user_id;
            const {resource} = req.body;
            console.log(resource);
            const result = await ResourcesSharingService.shareResource(sharer_id, resource);
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
    async getMyShareLinksResources(req,res){
        try{
            const sharer_id = req.params.user_id;
            const resourceList = await ResourcesSharingService.getMyShareLinksResources(sharer_id);
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
            const receiver_id = req.params.user_id;
            const resourceList = await ResourcesSharingService.getSharedWithMeResources(receiver_id);
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
            const sharer_id = req.params.user_id;
            const {categories, semesters} = req.body;
            const filteredResourceList = await ResourcesSharingService.getFilteredResources(sharer_id,"sharer_id",categories,semesters);
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
            const receiver_id = req.params.user_id;
            const {categories, semesters} = req.body;
            const filteredResourceList = await ResourcesSharingService.getFilteredResources(receiver_id,"receiver_id",categories,semesters);
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
            const sharer_id = req.params.user_id;
            const {key} = req.body;
            const searchedResourceList = await ResourcesSharingService.getSearchedResources(sharer_id,"sharer_id",key);
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
            const receiver_id = req.params.user_id;
            const {key} = req.body;
            const searchedResourceList = await ResourcesSharingService.getSearchedResources(receiver_id,"receiver_id",key);
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
            const resource_id = req.params.resource_id;
            const resource = await ResourcesSharingService.getResourceDetails(resource_id);
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
            const resource_id = req.params.resource_id;
            const receiver_id = req.params.user_id;

            const resource = await ResourcesSharingService.getResourceDetails(resource_id,receiver_id);
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