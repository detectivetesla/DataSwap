const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const authMiddleware = require('../middleware/auth');

router.post('/deposit', authMiddleware, walletController.initializeDeposit);
router.get('/balance', authMiddleware, walletController.getBalance);
router.post('/fund', authMiddleware, walletController.fundWallet);
router.get('/verify/:reference', authMiddleware, walletController.verifyDeposit);
router.get('/deposits', authMiddleware, walletController.getDeposits);
router.get('/transactions', authMiddleware, walletController.getTransactions);

module.exports = router;
