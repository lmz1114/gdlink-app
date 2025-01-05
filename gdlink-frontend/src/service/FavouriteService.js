import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/favourites';

const FavouriteService = {
    async setFavourite(userId,resourceId){
        try {
            const response = await axios.post(`${API_BASE_URL}/add_to_favourites/${resourceId}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error add to favourites:', error);
        }
    },
    async removeFavourite(userId,resourceId){
        try {
            const response =  await axios.delete(`${API_BASE_URL}/remove_from_favourites/${resourceId}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error remove from favourites:', error);
        }
    },

    async getFavouriteResources(userId){
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getFilteredFavouriteResources(userId,selectedCategories,selectedSemesters){
        try {
            const response = await axios.post(`${API_BASE_URL}/${userId}/filter`,{
                categories: selectedCategories,
                semesters: selectedSemesters,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getSearchedFavouriteResources(userId,key){
        try {
            const response = await axios.post(`${API_BASE_URL}/${userId}/search`,{
                key: key,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

};

export default FavouriteService;

