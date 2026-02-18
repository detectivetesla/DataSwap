const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, orderController.getOrders);
router.post('/purchase', authMiddleware, orderController.purchaseData);

module.exports = router;
