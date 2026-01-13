const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const db = require('../db');

// Admin Check Middleware
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
};

// --- USERS CRUD ---

// Get All Users
router.get('/users', authMiddleware, adminOnly, async (req, res) => {
    try {
        const result = await db.query('SELECT id, email, full_name, role, wallet_balance, created_at FROM users ORDER BY created_at DESC');
        res.json({ users: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

// Update User Wallet
router.post('/users/:id/balance', authMiddleware, adminOnly, async (req, res) => {
    const { id } = req.params;
    const { amount, action } = req.body; // action: 'add' or 'subtract'
    try {
        const query = action === 'add'
            ? 'UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2 RETURNING wallet_balance'
            : 'UPDATE users SET wallet_balance = wallet_balance - $1 WHERE id = $2 RETURNING wallet_balance';

        const result = await db.query(query, [amount, id]);
        res.json({ message: 'Wallet updated successfully', balance: result.rows[0].wallet_balance });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update wallet', error: error.message });
    }
});

// Delete User
router.delete('/users/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// --- BUNDLES CRUD ---

// Get All Bundles
router.get('/bundles', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM bundles ORDER BY network, price_ghc');
        res.json({ bundles: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bundles' });
    }
});

// Create Bundle
router.post('/bundles', authMiddleware, adminOnly, async (req, res) => {
    const { network, name, data_amount, price_ghc } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO bundles (network, name, data_amount, price_ghc) VALUES ($1, $2, $3, $4) RETURNING *',
            [network, name, data_amount, price_ghc]
        );
        res.status(201).json({ message: 'Bundle created', bundle: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create bundle' });
    }
});

// Update Bundle
router.put('/bundles/:id', authMiddleware, adminOnly, async (req, res) => {
    const { network, name, data_amount, price_ghc, is_active } = req.body;
    try {
        const result = await db.query(
            'UPDATE bundles SET network = $1, name = $2, data_amount = $3, price_ghc = $4, is_active = $5 WHERE id = $6 RETURNING *',
            [network, name, data_amount, price_ghc, is_active, req.params.id]
        );
        res.json({ message: 'Bundle updated', bundle: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update bundle' });
    }
});

// Toggle Bundle Status
router.post('/bundles/:id/toggle', authMiddleware, adminOnly, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('UPDATE bundles SET is_active = NOT is_active WHERE id = $1 RETURNING is_active', [id]);
        res.json({ message: `Bundle status updated`, is_active: result.rows[0].is_active });
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle bundle' });
    }
});

// Delete Bundle
router.delete('/bundles/:id', authMiddleware, adminOnly, async (req, res) => {
    try {
        await db.query('DELETE FROM bundles WHERE id = $1', [req.params.id]);
        res.json({ message: 'Bundle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete bundle' });
    }
});

module.exports = router;
