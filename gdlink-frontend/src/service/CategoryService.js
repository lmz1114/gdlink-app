import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/categories';

const CategoryService = {
    async getCategoryList(){
        try {
            const response = await axios.get(`${API_BASE_URL}/category_list`);
            return response.data;
        } catch (error) {
            console.error('Error sharing resource:', error);
        }
    },
};

export default CategoryService;
