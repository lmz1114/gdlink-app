const express = require('express');
const FavouriteController = require('../controller/FavouriteController');

const router = express.Router();

router.post('/add_to_favourites/:resourceId/:userId', FavouriteController.setFavourite); 
router.delete('/remove_from_favourites/:resourceId/:userId', FavouriteController.removeFavourite); 
router.get('/:userId', FavouriteController.getFavouriteResources); 
router.post('/:userId/filter', FavouriteController.getFilteredFavouriteResources); 
router.post('/:userId/search', FavouriteController.getSearchedFavouriteResources); 

module.exports = router;