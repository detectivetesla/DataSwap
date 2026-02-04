const db = require('../db');

/**
 * Create a notification for a user
 */
const createNotification = async ({ userId, title, message, type = 'info' }) => {
    try {
        await db.query(
            'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
            [userId, title, message, type]
        );
    } catch (error) {
        console.error('Failed to create notification:', error);
    }
};

/**
 * Create a message/inbox item for a user
 */
const createMessage = async ({ userId, title, content, sender = 'System' }) => {
    try {
        await db.query(
            'INSERT INTO messages (user_id, title, content, sender) VALUES ($1, $2, $3, $4)',
            [userId, title, content, sender]
        );
    } catch (error) {
        console.error('Failed to create message:', error);
    }
};

module.exports = {
    createNotification,
    createMessage
};
