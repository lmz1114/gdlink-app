const express = require('express');
const UserLogController = require('../controller/UserLogController');

const router = express.Router();

router.post('/log_user_action', UserLogController.createUserLog);
router.get('/', UserLogController.getAllUserLogs);
router.post('/search', UserLogController.getSearchedUserLogs); 

module.exports = router;
