const express = require('express');
const HomeController = require('../controller/HomeController');

const router = express.Router();

router.get('/:user_id/chart', HomeController.getChartData); 
router.get('/:user_id/recent_access', HomeController.getRecentAccessResources); 

module.exports = router;