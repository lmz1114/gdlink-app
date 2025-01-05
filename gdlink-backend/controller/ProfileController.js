const ProfileService = require('../service/ProfileService');

const ProfileController = {
    async getUserData(req,res){
        const userId = req.params.userId;
        
        try{
            const userData = await ProfileService.getUserData(userId);
            return res.json(userData);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving user data',
              error: error.message, 
            });
        }
    },

    async updatePicture(req,res){
        const userId = req.params.userId;
        const imagePath = req.file.filename;
        
        try{
            const result = await ProfileService.updatePicture(userId,imagePath);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while uploading picture',
              error: error.message, 
            });
        }
    },

    async deletePicture(req,res){
        const userId = req.params.userId;
        
        try{
            const result = await ProfileService.deletePicture(userId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while deleting picture',
              error: error.message, 
            });
        }
    },

    async updatePassword(req,res){
        const userId = req.params.userId;
        const {currentPassword, newPassword, confirmPassword } = req.body;        
        try{
            const result = await ProfileService.updatePassword(userId,currentPassword,newPassword,confirmPassword);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while updating password',
              error: error.message, 
            });
        }
    },
}

module.exports = ProfileController;