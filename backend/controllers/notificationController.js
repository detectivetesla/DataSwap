const db = require('../db');

const notificationController = {
    getNotifications: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await db.query(
                'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
                [userId]
            );
            res.json({ notifications: result.rows });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch notifications' });
        }
    },

    markAsRead: async (req, res) => {
        try {
            const userId = req.user.id;
            await db.query('UPDATE notifications SET is_read = TRUE WHERE user_id = $1', [userId]);
            res.json({ message: 'Notifications marked as read' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update notifications' });
        }
    }
};

module.exports = notificationController;
