const db = require('./backend/db');

async function promoteUser(email) {
    try {
        const result = await db.query(
            "UPDATE users SET role = 'admin' WHERE email = $1 RETURNING id, email, role",
            [email]
        );

        if (result.rowCount === 0) {
            console.log(`User with email ${email} not found.`);
        } else {
            console.log('User promoted successfully:');
            console.log(JSON.stringify(result.rows[0], null, 2));
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Get email from command line argument
const email = process.argv[2];
if (!email) {
    console.error('Please provide an email address.');
    process.exit(1);
}

promoteUser(email);
