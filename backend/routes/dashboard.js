const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');
const paystackService = require('../services/paystack');

// Initialize Deposit
router.post('/deposit', authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;
        const userEmail = req.user.email;

        if (!amount || amount < 5) {
            return res.status(400).json({ message: 'Minimum deposit amount is GH₵ 5.00' });
        }

        // Apply 2% fee
        const fee = amount * 0.02;
        const totalAmount = Number(amount) + Number(fee);

        const metadata = {
            user_id: userId,
            purpose: 'wallet_funding',
            requested_amount: amount,
            fee: fee
        };

        const paystackData = await paystackService.initializeTransaction(userEmail, totalAmount, metadata);

        // Record pending transaction
        await db.query(
            'INSERT INTO transactions (user_id, type, purpose, amount, status, reference, metadata, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [userId, 'credit', 'wallet_funding', amount, 'processing', paystackData.reference, JSON.stringify(metadata), 'paystack']
        );

        res.json({
            authorizationUrl: paystackData.authorization_url,
            reference: paystackData.reference,
            fee,
            totalAmount
        });
    } catch (error) {
        console.error('Deposit Init Error:', error);
        res.status(500).json({ message: 'Failed to initialize deposit', error: error.message });
    }
});
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Wallet Balance
        const balanceResult = await db.query('SELECT wallet_balance FROM users WHERE id = $1', [userId]);
        const walletBalance = balanceResult.rows[0]?.wallet_balance || 0;

        // Total Orders
        const totalOrdersResult = await db.query(
            "SELECT COUNT(*) FROM transactions WHERE user_id = $1 AND purpose = 'data_purchase'",
            [userId]
        );
        const totalOrders = totalOrdersResult.rows[0].count;

        // Processing Orders
        const processingOrdersResult = await db.query(
            "SELECT COUNT(*) FROM transactions WHERE user_id = $1 AND purpose = 'data_purchase' AND status = 'processing'",
            [userId]
        );
        const processingOrders = processingOrdersResult.rows[0].count;

        // Completed Orders
        const completedOrdersResult = await db.query(
            "SELECT COUNT(*) FROM transactions WHERE user_id = $1 AND purpose = 'data_purchase' AND status = 'success'",
            [userId]
        );
        const completedOrders = completedOrdersResult.rows[0].count;

        res.json({
            walletBalance: Number(walletBalance),
            totalOrders: Number(totalOrders),
            processingOrders: Number(processingOrders),
            completedOrders: Number(completedOrders)
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
    }
});

// Get Recent Transactions
router.get('/transactions', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query(
            'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
            [userId]
        );
        res.json({ transactions: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
});

// Get Recent Orders (Data Purchases)
router.get('/orders', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query(
            `SELECT t.*, b.name as bundle_name, b.network 
             FROM transactions t 
             LEFT JOIN bundles b ON t.bundle_id = b.id 
             WHERE t.user_id = $1 AND t.purpose = 'data_purchase' 
             ORDER BY t.created_at DESC LIMIT 10`,
            [userId]
        );
        res.json({ orders: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});

module.exports = router;
