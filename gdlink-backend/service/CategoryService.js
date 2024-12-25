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
    }
}

module.exports = CategoryService;