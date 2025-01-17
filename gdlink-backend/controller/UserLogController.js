const UserLogService = require('../service/UserLogService');

const UserLogController = {

    async createUserLog(req, res) {
        const { userId, actionMessage } = req.body;
        
        if (!userId || !actionMessage) {
            return res.status(400).json({ message: 'Missing userId or actionMessage' });
        }

        try {
            
            await UserLogService.createUserLog(userId, actionMessage);
            return res.status(200).json({ message: 'Action logged successfully' });
        } catch (error) {
            console.error('Error logging user action:', error);
            return res.status(500).json({ message: 'Failed to log action' });
        }
    },

    async getAllUserLogs(req, res) {
        try {
            const result = await UserLogService.getAllUserLogs();
            console.log(result);
            return res.json({ UserLog: result });
        } catch (error) {
            console.error('Error in fetching user log:', error.message);
            res.status(500).json({
                message: 'Failed to fetch userlog',
                error: error.message,
            });
        }
    },

    async getSearchedUserLogs(req, res) {
        try {
            const { key } = req.body;
            const searchedUserLogs = await UserLogService.getSearchedUserLogs(key);
            return res.json(searchedUserLogs);
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while retrieving the user logs',
                error: error.message,
            });
        }
    }

};

module.exports = UserLogController;
