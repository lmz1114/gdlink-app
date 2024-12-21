import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/resources';

const ResourcesSharingService = {
    async shareResource(user_id,resource){
        try {
            console.log("hey");
            const response = await axios.post(`${API_BASE_URL}/share/${user_id}`,{
                resource: resource
            });
            return response.data;
        } catch (error) {
            console.error('Error sharing resource:', error);
        }
    },

    async getMySharedResources(user_id){
        try {
            const response = await axios.get(`${API_BASE_URL}/my_sharelink/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getResourceDetails(resource_id){
        try {
            console.log(resource_id);
            const response = await axios.get(`${API_BASE_URL}/${resource_id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    }
    
};

export default ResourcesSharingService;
