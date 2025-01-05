const ProfileDAO = require('../DAO/UserDAO');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const ProfileService = {
    async getUserData(userId){
        try{
            return await ProfileDAO.getUserData(userId);
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while retreiving user data. Please try again later.'
            };
        }
    },

    async updatePicture(userId,imagePath){
        try{
            const currentPicture = await ProfileDAO.getUserPicture(userId);
            if(currentPicture[0].picture){
                const filePath = path.join(__dirname,'..','profile_picture', currentPicture[0].picture);
                fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting the image:', err);
                    } else {
                        console.log('Image deleted successfully!');
                    }
                });
            } 
            return await ProfileDAO.updatePicture(userId,imagePath);
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while uploading user picture. Please try again later.'
            };
        }
    },

    async deletePicture(userId){
        try{
            const currentPicture = await ProfileDAO.getUserPicture(userId);
            if(currentPicture[0].picture){
                const filePath = path.join(__dirname,'..','profile_picture', currentPicture[0].picture);
                fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting the image:', err);
                    } else {
                        console.log('Image deleted successfully!');
                    }
                });
            } 
            return await ProfileDAO.deletePicture(userId);
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while deleting user picture. Please try again later.'
            };
        }
    },

    async updatePassword(userId,currentPassword,newPassword,confirmPassword){
        try{
            if(currentPassword){
                const dbPassword = await ProfileDAO.getUserPassword(userId);
                if (!dbPassword[0].password) {
                    return {message: "User not found" };
                }        
                const isCurrentMatch = await bcrypt.compare(currentPassword,dbPassword[0].password);
                if (!isCurrentMatch) {
                    return { message: "Current password is incorrect" };
                }
            }
            if(newPassword !== confirmPassword){
                return { message: "Confirm password is incorrect" };
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            return await ProfileDAO.updatePassword(userId,hashedPassword);
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while updating password. Please try again later.'
            };
        }
    },

    async hashPassword(password) {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}

module.exports = ProfileService;