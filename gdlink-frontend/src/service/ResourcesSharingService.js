import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/resources';

const ResourcesSharingService = {
    async shareResource(userId,resource){
        console.log(resource);
        try {
            const response = await axios.post(`${API_BASE_URL}/share/${userId}`,{
                resource: resource
            });
            return response.data;
        } catch (error) {
            console.error('Error sharing resource:', error);
        }
    },

    async editResource(userId,resourceId,previousShareTo,previousReceiverGroups,previousReceivers,resource){
        try {
            const response = await axios.put(`${API_BASE_URL}/edit/${userId}/${resourceId}`,{
                resourceId: resourceId,
                previousShareTo : previousShareTo,
                resource: resource,
                previousReceiverGroups: previousReceiverGroups,
                previousReceivers: previousReceivers
            });
            return response.data;
        } catch (error) {
            console.error('Error editing resource:', error);
        }
    },

    async deleteResource(resourceId) { 
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete/${resourceId}`);
            return response.data;
        } catch (error) {
            console.error('Delete SErvice Error:', error);
            throw error;  
        }
    },

    async getMyShareLinksResources(userId){
        try {
            const response = await axios.get(`${API_BASE_URL}/my_sharelink/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getSharedWithMeResources(userId){
        try {
            const response = await axios.get(`${API_BASE_URL}/shared_with_me/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getFilteredMyShareLinksResources(userId,selectedCategories,selectedSemesters){
        try {
            const response = await axios.post(`${API_BASE_URL}/my_sharelink/${userId}/filter`,{
                categories: selectedCategories,
                semesters: selectedSemesters,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getFilteredSharedWithMeResources(userId,selectedCategories,selectedSemesters){
        try {
            const response = await axios.post(`${API_BASE_URL}/shared_with_me/${userId}/filter`,{
                categories: selectedCategories,
                semesters: selectedSemesters,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getSearchedMyShareLinksResources(userId,key){
        try {
            const response = await axios.post(`${API_BASE_URL}/my_sharelink/${userId}/search`,{
                key: key
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getSearchedSharedWithMeResources(userId,key){
        try {
            const response = await axios.post(`${API_BASE_URL}/shared_with_me/${userId}/search`,{
                key: key
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getMyShareLinksResourceDetails(resourceId){
        try {
            const response = await axios.get(`${API_BASE_URL}/${resourceId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getSharedWithMeResourceDetails(resourceId,userId){
        try {
            const response = await axios.get(`${API_BASE_URL}/${resourceId}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getAllResources(){
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    }
    
};

export default ResourcesSharingService;
