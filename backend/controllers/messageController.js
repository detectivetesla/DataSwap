const db = require('../db');

const messageController = {
    getMessages: async (req, res) => {
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
    },

    getUnreadCount: async (req, res) => {
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
    }
};

module.exports = messageController;
