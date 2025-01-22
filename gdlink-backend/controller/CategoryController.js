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

    async createCategory(req, res) {
        try {
            
            const { categoryName, color, accessibility} = req.body; 
            const result = await CategoryService.createCategory(categoryName, color, accessibility);
            console.log(categoryName, color, accessibility);
            if (result.error) {
                return res.status(400).json(result);
            }
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while creating the category',
                error: error.message,
            });
        }
    },

    async updateCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const { categoryName, color, accessibility } = req.body;
    
            const result = await CategoryService.updateCategory(categoryId, categoryName, color, accessibility);
            return res.json(result);
        } catch (error) {
            console.error('Error updating category:', error.message);
            res.status(500).json({ message: 'Failed to update category.' });
        }
    },

    async deleteCategory(req, res) {       
        try {
            const { categoryId } = req.params;
            const result = await CategoryService.deleteCategory(categoryId);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting category:', error.message);
            res.status(500).json({ message: 'Failed to delete category.' });
        }
    },

    async getCategoryById(req, res) {
        try {
            const { categoryId } = req.params;    
            const result = await CategoryService.getCategoryById(categoryId); 
    
            if (!result) {
                return res.status(404).json({ message: 'Category not found.' }); 
            }
    
            res.status(200).json(result); 
        } catch (error) {
            console.error('Error fetching category:', error.message);
            return res.status(500).json({ message: 'Failed to fetch category.' });
        }
    }
}

module.exports = CategoryController;