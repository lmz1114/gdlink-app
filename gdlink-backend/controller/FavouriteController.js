const FavouriteService = require('../service/FavouriteService');

const FavouriteController = {
    async setFavourite(req,res){
        try{
            const user_id = req.params.user_id;
            const resource_id = req.params.resource_id;
            const result = await FavouriteService.setFavourite(user_id,resource_id);
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
            const user_id = req.params.user_id;
            const resource_id = req.params.resource_id;
            const result = await FavouriteService.removeFavourite(user_id,resource_id);
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
            const user_id = req.params.user_id;
            const resourceList = await FavouriteService.getFavouriteResources(user_id);
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
            const user_id = req.params.user_id;
            console.log(user_id);
            const {categories, semesters} = req.body;
            const filteredResourceList = await FavouriteService.getFilteredResources(user_id,categories,semesters);
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
            const user_id = req.params.user_id;
            
            const {key} = req.body;
            const searchedResourceList = await FavouriteService.getSearchedResources(user_id,key);
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
