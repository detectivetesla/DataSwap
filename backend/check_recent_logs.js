const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function check() {
    try {
        console.log('--- LOGS FROM LAST 60 MINUTES ---');
        const logs = await pool.query(`
            SELECT type, level, action, message, created_at 
            FROM activity_logs 
            WHERE created_at >= NOW() - INTERVAL '1 hour'
            ORDER BY created_at DESC;
        `);
        console.table(logs.rows);

        console.log('\n--- LATEST SUCESSFUL LOGINS (to verify connection is working) ---');
        const logins = await pool.query(`
            SELECT action, message, created_at 
            FROM activity_logs 
            WHERE action = 'User Login'
            ORDER BY created_at DESC 
            LIMIT 3;
        `);
        console.table(logins.rows);

    } catch (err) {
        console.error('Check failed:', err.message);
    } finally {
        await pool.end();
    }
}

check();
