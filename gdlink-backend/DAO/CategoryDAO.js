const { getConnection } = require('../db');

const CategoryDAO = {
    async getCategoryList(){
        const conn = await getConnection();
        try{
            const query = 'SELECT * FROM CATEGORY';
            const rows = conn.query(query);
            return rows;
        }catch(error){
            console.error('Error occurred while retrieving categories:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving categories. Please try again later.',
            };
        }finally{
            if(conn) conn.release();
        }

    }
}

module.exports = CategoryDAO;
