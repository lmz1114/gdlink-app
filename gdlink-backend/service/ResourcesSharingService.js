// services/itemService.js
const UserDAO = require('../DAO/UserDAO');
const ResourcesSharingDAO = require('../DAO/ResourcesSharingDAO');

const ResourceSharingService = {
    async shareResource(sharer_id, resource) {
        const { shareTo } = resource;
        console.log(shareTo);
        let receivers;
    
        try {
            switch (shareTo) {
                case "all":
                    receivers = await UserDAO.getAllUsers(sharer_id);
                    break;
                case "lecturers":  
                    receivers = await UserDAO.getAllLecturer(sharer_id);
                    break;
                case "students":
                    receivers = await UserDAO.getAllStudent(sharer_id);
                    break;
                default:
                    receivers = resource.receiver;
            }
            console.log(receivers);
            return await ResourcesSharingDAO.shareResource(sharer_id, resource, receivers);
    
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while sharing the resource. Please try again later.'
            };
        }
    },   
    
    async getMySharedResources(sharer_id){
        try{
            return await ResourcesSharingDAO.getMySharedResources(sharer_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getResourceDetails(resource_id){
        try{
            return await ResourcesSharingDAO.getResourceDetails(resource_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    }
}

module.exports = ResourceSharingService;
