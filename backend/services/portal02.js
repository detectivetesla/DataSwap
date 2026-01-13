const axios = require('axios');
require('dotenv').config();

const PORTAL02_BASE_URL = 'https://portal02.com/api'; // Replace with actual base URL if different

const portal02Service = {
    /**
     * Fetch all available bundles from Portal02
     */
    syncBundles: async () => {
        try {
            const response = await axios.get(`${PORTAL02_BASE_URL}/bundles`, {
                headers: { 'Authorization': `Bearer ${process.env.PORTAL02_API_KEY}` }
            });
            return response.data; // Expected: array of bundle objects
        } catch (error) {
            console.error('Portal02 Sync Error:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Purchase a data bundle for a recipient
     */
    purchaseData: async (bundleCode, phoneNumber) => {
        try {
            const response = await axios.post(`${PORTAL02_BASE_URL}/buy-data`, {
                bundle_code: bundleCode,
                phone: phoneNumber,
                callback_url: `${process.env.BACKEND_URL}/webhooks/portal02`
            }, {
                headers: { 'Authorization': `Bearer ${process.env.PORTAL02_API_KEY}` }
            });
            return response.data; // Expected: delivery status and reference
        } catch (error) {
            console.error('Portal02 Purchase Error:', error.response?.data || error.message);
            throw error;
        }
    }
};

module.exports = portal02Service;
