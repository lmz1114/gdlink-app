import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/login';

const LoginService = {
    async loginWithDbCheck(userId, password) {
        try {
            const response = await axios.post(`${API_BASE_URL}/db_check`, { user_id: userId, password });
            return response.data;
        } catch (error) {
            throw new Error('Error during DB check login');
        }
    },

    async loginWithDefaultPass(userId, password) {
        try {
          const response = await axios.get(`http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=authentication&login=${userId}&password=${password}`);
          return response.data;
        } catch (error) {
          throw new Error('Error during default login');
        }
    },

    async firstTimeLogin (instance) {
        try {
            const response = await axios.post(`${API_BASE_URL}/first_time_login`, {
                user_id: instance.login_name,
                username: instance.full_name,
                email: instance.email,
                role: instance.description,
            });
            return response.data;
        } catch (error) {
            throw new Error('Error during first-time login');
        }
    }
};

export default LoginService;