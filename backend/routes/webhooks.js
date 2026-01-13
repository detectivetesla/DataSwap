const express = require('express');
const router = express.Router();
const crypto = require('crypto');
// Load db pool here if available

// Middleware to verify Paystack signature
const verifyPaystackSignature = (req, res, next) => {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
        next();
    } else {
        res.sendStatus(400);
    }
};

// Paystack Webhook
router.post('/paystack', verifyPaystackSignature, async (req, res) => {
    const event = req.body;

    if (event.event === 'charge.success') {
        const { reference, amount, customer } = event.data;
        console.log(`Payment success: ${reference}, Amount: ${amount / 100}`);
        // TODO: Update user wallet or order status in DB
    }

    res.sendStatus(200);
});

// Portal02 Webhook
router.post('/portal02', async (req, res) => {
    const { reference, status } = req.body;
    console.log(`Order ${reference} status updated to: ${status}`);
    // TODO: Update transaction status in DB and notify user via Socket.IO
    res.sendStatus(200);
});

module.exports = router;
