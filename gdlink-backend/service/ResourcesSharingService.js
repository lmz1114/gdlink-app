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
    
    async getMyShareLinksResources(sharer_id){
        try{
            return await ResourcesSharingDAO.getMyShareLinksResources(sharer_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getSharedWithMeResources(receiver_id){
        try{
            return await ResourcesSharingDAO.getSharedWithMeResources(receiver_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getFilteredResources(user_id,user_id_type,categories,semesters){
        try{
            return await ResourcesSharingDAO.getFilteredResources(user_id,user_id_type,categories,semesters);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getSearchedResources(user_id,user_id_type,key){
        try{
            return await ResourcesSharingDAO.getSearchedResources(user_id,user_id_type,key);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getResourceDetails(resource_id,receiver_id = null){
        try{
            await ResourcesSharingDAO.updateAccessTime(resource_id, receiver_id);
            return await ResourcesSharingDAO.getResourceDetails(resource_id, receiver_id);
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
