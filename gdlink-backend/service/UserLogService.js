const UserLogDAO = require('../DAO/UserLogDao'); 

const UserLogService = {
    
    async createUserLog(userId, actionMessage) {
        try {
            return await UserLogDAO.insertUserLog(userId, actionMessage);
        } catch (error) {
            console.error('Error creating user log:', error);
            throw new Error('Failed to create user log');
        }
    },

    async getAllUserLogs() {
        try {
            return await UserLogDAO.getUserLogs();
        } catch (error) {
            console.error('Error fetching all user logs:', error);
            throw new Error('Failed to fetch all user logs');
        }
    },

    async getSearchedUserLogs(key) {
        try {
            return await UserLogDAO.getSearchedUserLogs(key);
        } catch (error) {
            console.error('Error fetching all user logs:', error);
            throw new Error('Failed to fetch all user logs');
        }
    },
};

module.exports = UserLogService;
