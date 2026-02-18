const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, messageController.getMessages);
router.get('/unread-count', authMiddleware, messageController.getUnreadCount);

module.exports = router;
