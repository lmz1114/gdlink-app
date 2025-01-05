const { getRecentAccessResources } = require('../DAO/ResourcesSharingDAO');
const HomeService = require('../service/HomeService');

const HomeController = {
    async getChartData(req,res){
        const userId = req.params.userId;
        try{
            const data = await HomeService.getChartData(userId);
            return res.json(data);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the categories',
              error: error.message, 
            });
        }
    },

    async getRecentAccessResources(req,res){
        const userId = req.params.userId;
        try{
            const data = await HomeService.getRecentAccessResources(userId);
            return res.json(data);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the categories',
              error: error.message, 
            });
        }
    },
}

module.exports = HomeController;