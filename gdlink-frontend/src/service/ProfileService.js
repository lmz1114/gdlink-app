import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/profile';

const ProfileService = {
    async getUserData(userId){
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    },

    async updatePicture(userId,formData){
        try {
            const response = await axios.post(`${API_BASE_URL}/upload_image/${userId}`,formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return response.data;
        } catch (error) {
            console.error('Error uploading picture:', error);
        }
    },

    async deletePicture(userId){
        try {
            const response = await axios.patch(`${API_BASE_URL}/remove_image/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error uploading picture:', error);
        }
    },

    async updatePassword(userId,currentPassword, newPassword, confirmPassword){
        try {
            const response = await axios.post(`${API_BASE_URL}/change_password/${userId}`,{
                currentPassword: currentPassword, 
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })
            return response.data;
        } catch (error) {
            console.error('Error updating password:', error);
        }
    },

    getPictureUrl(user){
        return `${API_BASE_URL}/images/${user.picture}`;
    }
};

export default ProfileService;