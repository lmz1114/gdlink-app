const express = require('express');
const CategoryController = require('../controller/CategoryController');

const router = express.Router();

router.get('/category_list', CategoryController.getCategoryList); 
router.post('/add', CategoryController.createCategory);
router.put('/update/:categoryId', CategoryController.updateCategory);
router.delete('/delete/:categoryId', CategoryController.deleteCategory);
router.get('/get/:categoryId', CategoryController.getCategoryById);

module.exports = router;