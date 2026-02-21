const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function check() {
    try {
        console.log('--- ALL LOGS FROM TODAY (2026-02-21) ---');
        const logs = await pool.query(`
            SELECT id, type, level, action, message, created_at 
            FROM activity_logs 
            WHERE created_at >= '2026-02-21'
            ORDER BY created_at DESC;
        `);
        console.table(logs.rows);

    } catch (err) {
        console.error('Check failed:', err.message);
    } finally {
        await pool.end();
    }
}

check();
