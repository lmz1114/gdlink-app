const express = require('express');
const HomeController = require('../controller/HomeController');

const router = express.Router();

router.get('/:user_id', HomeController.getChartData); 

module.exports = router;