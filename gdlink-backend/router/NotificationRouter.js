const express = require('express');
const NotificationController = require('../controller/NotificationController');

const router = express.Router();

router.get('/:userId', NotificationController.getUserNotifications);
router.put('/:userId/:notificationId', NotificationController.markAsRead);
router.delete('/:userId/:notificationId', NotificationController.deleteNotification);

module.exports = router;
