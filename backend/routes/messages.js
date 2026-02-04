const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Get all messages for current user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query(
            'SELECT * FROM messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
            [userId]
        );
        res.json({ messages: result.rows });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
});

// Get unread messages count
router.get('/unread-count', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await db.query(
            'SELECT COUNT(*) FROM messages WHERE user_id = $1 AND is_read = FALSE',
            [userId]
        );
        res.json({ count: parseInt(result.rows[0].count) });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch count', error: error.message });
    }
});

// Mark message as read
router.patch('/:id/read', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await db.query(
            'UPDATE messages SET is_read = TRUE WHERE id = $1 AND user_id = $2',
            [id, userId]
        );
        res.json({ message: 'Message marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update message' });
    }
});

module.exports = router;
