import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/userlog';

const UserLogService = {
    async createUserLog(userId, actionMessage) {
        try {
            const response = await axios.post(`${API_BASE_URL}/log_user_action`, {
                userId,
                actionMessage,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating user log:', error);
            throw error;
        }
    },

    async getAllUserLogs() {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user logs:', error);
        }
    },

    async getSearchedUserLogs(key) {
        try {
            const response = await axios.post(`${API_BASE_URL}/search`, {
                key: key,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },
}

export default UserLogService;
