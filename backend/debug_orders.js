const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function check() {
    try {
        console.log('--- LATEST DATA PURCHASE TRANSACTIONS ---');
        const orders = await pool.query(`
            SELECT id, reference, status, retries, last_error, provider_order_id, created_at, recipient_phone, purpose
            FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 20;
        `);
        console.table(orders.rows);

        console.log('\n--- LATEST ERROR LOGS ---');
        const logs = await pool.query(`
            SELECT type, action, message, created_at 
            FROM activity_logs 
            WHERE level = 'error' OR action LIKE '%Failure%' OR action LIKE '%Queue%'
            ORDER BY created_at DESC 
            LIMIT 5;
        `);
        console.table(logs.rows);

    } catch (err) {
        console.error('Check failed:', err.message);
    } finally {
        await pool.end();
    }
}

check();
