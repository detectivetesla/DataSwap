const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../db');
const { logActivity } = require('../services/logger');
const notificationService = require('../services/notificationService');

// Middleware to verify Paystack signature
const verifyPaystackSignature = (req, res, next) => {
    if (!process.env.PAYSTACK_SECRET_KEY) {
        console.error('PAYSTACK_SECRET_KEY is not set');
        return res.sendStatus(500);
    }
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
        .update(req.rawBody || JSON.stringify(req.body))
        .digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
        next();
    } else {
        console.warn('Invalid Paystack signature');
        res.sendStatus(400);
    }
};

const walletController = require('../controllers/walletController');

// Paystack Webhook
router.post('/paystack', verifyPaystackSignature, async (req, res) => {
    try {
        const event = req.body;
        console.log(`Paystack Webhook Received: ${event.event}`);

        if (event.event === 'charge.success') {
            const { reference } = event.data;
            let metadata = event.data.metadata;

            // Paystack sometimes sends metadata as a string
            if (typeof metadata === 'string') {
                try {
                    metadata = JSON.parse(metadata);
                } catch (e) {
                    console.error('Failed to parse Paystack metadata string:', e.message);
                }
            }

            const userId = metadata?.user_id;
            const requestedAmount = metadata?.requested_amount;

            console.log(`Processing Webhook Success: Ref=${reference}, User=${userId}, Amount=${requestedAmount}`);

            if (!userId || !requestedAmount) {
                console.error('Missing userId or requestedAmount in webhook metadata');
                return res.sendStatus(200);
            }

            // Call our new robust funding logic
            // We pass req and res, but fundWallet needs certain properties on req
            req.user = { id: userId };
            req.body.amount = requestedAmount;
            req.body.reference = reference;

            return walletController.fundWallet(req, res);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Paystack Webhook Root Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const portal02Controller = require('../controllers/portal02Controller');

// Portal02 Webhook
router.post('/portal02', portal02Controller.handleWebhook);

module.exports = router;
