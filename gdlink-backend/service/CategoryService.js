const CategoryDAO = require('../DAO/CategoryDAO');

const CategoryService = {
    async getCategoryList(){
        try{
            return await CategoryDAO.getCategoryList();
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the categories. Please try again later.'
            };
        }
    },

    async createCategory(categoryName, color, accessibility) {
        try {
            
            return await CategoryDAO.createCategory(categoryName, color, accessibility);
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while creating the category. Please try again later.',
            };
        }
    },
    
    async updateCategory(categoryId, categoryName, color, accessibility) {
        if (!categoryName || !color ) {
            throw new Error('All fields (categoryName, color) are required.');
        }
        return await CategoryDAO.updateCategory(categoryId, categoryName, color, accessibility);
    },
    
    async deleteCategory(categoryId) {
        try {
            return await CategoryDAO.deleteCategory(categoryId);
        } catch (error) {
            console.error('Service Error - deleteCategory:', error);
            throw new Error('Failed to delete category.');
        }
    },
    
    async getCategoryById(categoryId) {       
        try {
            return await CategoryDAO.getCategoryById(categoryId); 
        } catch (error) {
            console.error('Error in Service fetching category:', error);
            throw new Error('Service layer failed to fetch category.');
        }
    }   
    
}

module.exports = CategoryService;