const express = require('express');
const CategoryController = require('../controller/CategoryController');

const router = express.Router();

router.get('/category_list', CategoryController.getCategoryList); 

module.exports = router;