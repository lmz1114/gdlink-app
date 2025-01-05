const FavouriteDAO = require('../DAO/FavouriteDAO');

const FavouriteService = {
    async setFavourite(userId,resourceId){
        try{
           return await FavouriteDAO.setFavourite(userId,resourceId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while setting favourite. Please try again later.'
            };
        }
    },

    async removeFavourite(userId,resourceId){
        try{
            return await FavouriteDAO.removeFavourite(userId,resourceId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while removing favourite. Please try again later.'
            };
        }
    },

    async getFavouriteResources(userId){
        try{
            return await FavouriteDAO.getFavouriteResources(userId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving favourite resources. Please try again later.'
            };
        }
    },

    async getFilteredResources(userId,categories,semesters){
        try{
            return await FavouriteDAO.getFilteredResources(userId,categories,semesters);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving favourite resources. Please try again later.'
            };
        }
    },

    async getSearchedResources(userId,key){
        try{
            return await FavouriteDAO.getSearchedResources(userId,key);
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