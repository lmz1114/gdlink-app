const FavouriteDAO = require('../DAO/FavouriteDAO');

const FavouriteService = {
    async setFavourite(user_id,resource_id){
        try{
           return await FavouriteDAO.setFavourite(user_id,resource_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while setting favourite. Please try again later.'
            };
        }
    },

    async removeFavourite(user_id,resource_id){
        try{
            return await FavouriteDAO.removeFavourite(user_id,resource_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while removing favourite. Please try again later.'
            };
        }
    },

    async getFavouriteResources(user_id){
        try{
            return await FavouriteDAO.getFavouriteResources(user_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving favourite resources. Please try again later.'
            };
        }
    },

    async getFilteredResources(user_id,categories,semesters){
        try{
            return await FavouriteDAO.getFilteredResources(user_id,categories,semesters);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving favourite resources. Please try again later.'
            };
        }
    },

    async getSearchedResources(user_id,key){
        try{
            return await FavouriteDAO.getSearchedResources(user_id,key);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving favourite resources. Please try again later.'
            };
        }
    }
}

module.exports = FavouriteService;