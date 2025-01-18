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
            res.status(201).json({ message: 'Category created successfully!' });
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

            console.log('Request body:', req.body);
            console.log('Request params:', req.params);
    
            if (!categoryId) {
                return res.status(400).json({ message: 'Category ID is required.' });
            }
            if (!categoryName || !color ) {
                return res.status(400).json({ 
                    message: 'All fields (category name, color) are required.',
                    received: req.body,
                });
            }
    
            const updatedCategory = await CategoryService.updateCategory(categoryId, categoryName, color, accessibility);
            res.status(200).json(updatedCategory);
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