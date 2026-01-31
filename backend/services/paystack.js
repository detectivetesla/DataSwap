const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const paystackService = {
    /**
     * Initialize a payment transaction
     */
    initializeTransaction: async (email, amount) => {
        try {
            const response = await axios.post(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
                email,
                amount: amount * 100, // Paystack expects amount in pesewas
                callback_url: `${process.env.FRONTEND_URL}/payment-callback`
            }, {
                headers: { 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
            });
            return response.data.data; // Returns authorization_url and reference
        } catch (error) {
            console.error('Paystack Initialize Error:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Verify a transaction status
     */
    verifyTransaction: async (reference) => {
        try {
            const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
                headers: { 'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
            });
            return response.data.data; // Returns transaction details
        } catch (error) {
            console.error('Paystack Verify Error:', error.response?.data || error.message);
            throw error;
        }
    }
};

module.exports = paystackService;
