const express = require('express');
const LoginController = require('../controller/LoginController');

const router = express.Router();

router.post('/db_check', LoginController.dbCheck);
router.post('/first_time_login', LoginController.firstTimeLogin);

module.exports = router;