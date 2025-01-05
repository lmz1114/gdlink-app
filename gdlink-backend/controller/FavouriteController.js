const FavouriteService = require('../service/FavouriteService');

const FavouriteController = {
    async setFavourite(req,res){
        try{
            const userId = req.params.userId;
            const resourceId = req.params.resourceId;
            const result = await FavouriteService.setFavourite(userId,resourceId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while setting favourite',
              error: error.message, 
            });
        }
    },
    async removeFavourite(req,res){
        try{
            const userId = req.params.userId;
            const resourceId = req.params.resourceId;
            const result = await FavouriteService.removeFavourite(userId,resourceId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while removing favourite',
              error: error.message, 
            });
        }
    },
    async getFavouriteResources(req,res){
        try{
            const userId = req.params.userId;
            const resourceList = await FavouriteService.getFavouriteResources(userId);
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getFilteredFavouriteResources(req,res){
        try{
            const userId = req.params.userId;
            const {categories, semesters} = req.body;
            const filteredResourceList = await FavouriteService.getFilteredResources(userId,categories,semesters);
            return res.json(filteredResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSearchedFavouriteResources(req,res){
        try{
            const userId = req.params.userId;
            
            const {key} = req.body;
            const searchedResourceList = await FavouriteService.getSearchedResources(userId,key);
            return res.json(searchedResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
}

module.exports = FavouriteController;
