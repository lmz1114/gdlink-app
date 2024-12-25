import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/home';

const HomeService = {
    async getChartData(user_id){
        try {
            const response = await axios.get(`${API_BASE_URL}/${user_id}/chart`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    },

    async getRecentAccessResource(user_id){
        try {
            const response = await axios.get(`${API_BASE_URL}/${user_id}/recent_access`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    },
};

export default HomeService;