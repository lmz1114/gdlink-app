const LoginService = require('../service/LoginService');

const LoginController = {

    async dbCheck(req,res){
        const { user_id, password } = req.body;

        try {
            const result = await LoginService.checkUserCredentials(user_id, password);
            console.log(result);
            return res.json(result);  
        } catch (error) {
            console.error('Error in dbCheck:', error.message);
            return res.status(500).json({
                message: 'Server error. Please try again later.',
            });
        }
    },

    async defaultLogin(req,res){
        const { userId, password } = req.body;

        try {
          const result = await LoginService.fetchExternalLogin(userId, password);
          return res.json(result);
        } catch (error) {
          console.error('Error in defaultLogin:', error.message);
          return res.status(500).json({ message: 'Server error occurred.', user: null });
        }
    },

    async firstTimeLogin(req,res){
        const { username, role, email, user_id } = req.body;

        try {
            const result = await LoginService.registerUser(username, role, email, user_id);
            return res.json(result);
        } catch (error) {
            console.error('Error in firstTimeLogin:', error.message);
            return res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    }
};

module.exports = LoginController;





