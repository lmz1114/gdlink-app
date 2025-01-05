const ResourcesSharingDAO = require('../DAO/ResourcesSharingDAO');

const HomeService = {
    async getChartData(userId){
        try{
            const myShareLinks = await ResourcesSharingDAO.getChartData(userId,'sharer_id');
            const sharedWithMe = await ResourcesSharingDAO.getChartData(userId,'receiver_id');

            return { myShareLinks, sharedWithMe };
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getRecentAccessResources(userId){
        try{
            return await ResourcesSharingDAO.getRecentAccessResources(userId);
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