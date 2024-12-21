const { getResourceDetails } = require('../DAO/ResourcesSharingDAO');
const ResourcesSharingService = require('../service/ResourcesSharingService');

const ResourcesSharingController = {
    async shareResource(req,res){
        try{
            const sharer_id = req.params.user_id;
            console.log(sharer_id);
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
    async getMySharedResources(req,res){
        try{
            const sharer_id = req.params.user_id;
            const resourceList = await ResourcesSharingService.getMySharedResources(sharer_id);
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getResourceDetails(req,res){
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
    }
}

module.exports = ResourcesSharingController;