import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/favourites';

const FavouriteService = {
    async setFavourite(user_id,resource_id){
        try {
            const response = await axios.post(`${API_BASE_URL}/add_to_favourites/${resource_id}/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error add to favourites:', error);
        }
    },
    async removeFavourite(user_id,resource_id){
        try {
            const response =  await axios.delete(`${API_BASE_URL}/remove_from_favourites/${resource_id}/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error remove from favourites:', error);
        }
    },

    async getFavouriteResources(user_id){
        try {
            const response = await axios.get(`${API_BASE_URL}/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getFilteredFavouriteResources(user_id,selectedCategories,selectedSemesters){
        try {
            const response = await axios.post(`${API_BASE_URL}/${user_id}/filter`,{
                categories: selectedCategories,
                semesters: selectedSemesters,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

    async getSearchedFavouriteResources(user_id,key){
        try {
            const response = await axios.post(`${API_BASE_URL}/${user_id}/search`,{
                key: key,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    },

};

export default FavouriteService;

