const CategoryService = require('../service/CategoryService');

const CategoryController = {
    async getCategoryList(req,res){
        try{
            const categoryList = await CategoryService.getCategoryList();
            return res.json(categoryList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the categories',
              error: error.message, 
            });
        }
    },
}

module.exports = CategoryController;