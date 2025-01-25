const bcrypt = require('bcrypt');
const axios = require('axios');
const UserDAO = require('../DAO/UserDAO');
const UserLogService = require('./UserLogService');
const ResourcesSharingService = require('./ResourcesSharingService');

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

    async registerUser(username, role, email, user_id) {
      const insertedUser = await UserDAO.insertUser(username, role, email, user_id);
      if (insertedUser) {
        await ResourcesSharingService.initUserResources(email, role);
        await UserLogService.createUserLog(user_id, `${insertedUser.name} registered to the system`);
        return { success: true, message: 'User inserted successfully!', user: insertedUser };
      }
      return { success: false, message: 'Failed to insert user.', user: null };
    }      
}

module.exports = LoginService; 



