const ResourcesSharingDAO = require('../DAO/ResourcesSharingDAO');

const HomeService = {
    async getChartData(user_id){
        try{
            const myShareLinks = await ResourcesSharingDAO.getChartData(user_id,'sharer_id');
            const sharedWithMe = await ResourcesSharingDAO.getChartData(user_id,'receiver_id');

            return { myShareLinks, sharedWithMe };
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getRecentAccessResources(user_id){
        try{
            return await ResourcesSharingDAO.getRecentAccessResources(user_id);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },
 
}

module.exports = HomeService;