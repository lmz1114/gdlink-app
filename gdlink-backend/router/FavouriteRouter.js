const express = require('express');
const FavouriteController = require('../controller/FavouriteController');

const router = express.Router();

router.post('/add_to_favourites/:resource_id/:user_id', FavouriteController.setFavourite); 
router.delete('/remove_from_favourites/:resource_id/:user_id', FavouriteController.removeFavourite); 
router.get('/:user_id', FavouriteController.getFavouriteResources); 
router.post('/:user_id/filter', FavouriteController.getFilteredFavouriteResources); 
router.post('/:user_id/search', FavouriteController.getSearchedFavouriteResources); 

module.exports = router;