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

    async createCategory(formData) {
        try {
          const response = await axios.post(`${API_BASE_URL}/add`, formData);
          return response.data;
        } catch (error) {
          console.error('Error creating category:', error);
          throw error;
        }
    },

    async updateCategory(categoryId, formData) {
        try {              
            console.log('Category ID:', categoryId);
            console.log('Form data being sent:', formData);
            const response = await axios.put(`${API_BASE_URL}/update/${categoryId}`, formData, {
            headers: { 'Content-Type': 'application/json' }, 
            });
            console.log('Response:', response.data);
            return response.data;
        } catch (error) {
        if (error.response) {
            console.error('Backend error:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to update category.');
        } else {
            console.error('Network error:', error.message);
            throw new Error('Network error. Please check your connection.');
        }
        }
    },

    async deleteCategory(categoryId) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete/${categoryId}`);
            console.log('Delete API Response:', response.data); 
            return response.data;
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    },


    async getCategoryById(categoryId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/get/${categoryId}`); 
            console.log('Get API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        }
    }
};

export default CategoryService;
