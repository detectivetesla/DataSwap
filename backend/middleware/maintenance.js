const db = require('../db');

const checkMaintenanceMode = async (req, res, next) => {
    try {
        // Skip for admin login/auth routes to ensure admins can always login
        // Also skip for static files or specific system routes if needed
        if (req.path.startsWith('/auth') || req.path.startsWith('/admin')) {
            return next();
        }

        const result = await db.query('SELECT value FROM settings WHERE key = $1', ['maintenance_mode']);

        if (result.rows.length > 0 && result.rows[0].value === 'true') {
            // Check if user is admin (if authenticated)
            if (req.user && req.user.role === 'admin') {
                return next();
            }

            return res.status(503).json({
                message: 'System is currently under maintenance. Please try again later.',
                maintenance: true
            });
        }

        next();
    } catch (error) {
        console.error('Maintenance Check Error:', error);
        next(); // Proceed on error to avoid blocking completely if DB fails
    }
};

module.exports = checkMaintenanceMode;
