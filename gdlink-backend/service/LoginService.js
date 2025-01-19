const bcrypt = require('bcrypt');
const axios = require('axios');
const UserDAO = require('../DAO/UserDAO');
const UserLogService = require('./UserLogService');

const LoginService = {

    async checkUserCredentials(user_id, password) {
        const user = await UserDAO.findUserById(user_id);
      
        if (!user) {
          return {loginType: 'first time login', message: 'User not found.', user: null };
        }
      
        if (!user.is_pass_changed) {
          return { loginType: 'default login', message: 'Password change required.', user: user};
        }
      
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          await UserLogService.createUserLog(user_id, `${user.name} logged into the system`);
          return {success: true, message: 'User login successful.', user: user };
        }
      
        return {success: false, message: 'Login failed. Please try again.'};
    },

    async fetchExternalLogin (userId, password) {
        const loginURL = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=authentication&login=${userId}&password=${password}`;
        try {
          const response = await axios.get(loginURL);
          if (!response.data || response.data.length === 0) {
            return {success: false, message: 'Login failed. Please try again.'};
          }
          return { success: true, message: 'User login successful.', user: response.data[0] };
        } catch (error) {
          throw new Error('Error fetching external login data.');
        }
    },

    async registerUser (username, role, email, user_id) {
        const insertedUser = await UserDAO.insertUser(username, role, email, user_id);
        if (insertedUser) {
            await UserLogService.createUserLog(user_id, `${insertedUser.name} registered to the system`);
            return {success: true, message: 'User inserted successfully!', user: insertedUser };
        }
        return {success: false, message: 'Failed to insert user.', user: null };
    }
}

module.exports = LoginService; 



