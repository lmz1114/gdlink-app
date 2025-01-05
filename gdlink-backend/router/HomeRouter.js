const express = require('express');
const HomeController = require('../controller/HomeController');

const router = express.Router();

router.get('/:userId/chart', HomeController.getChartData); 
router.get('/:userId/recent_access', HomeController.getRecentAccessResources); 

module.exports = router;