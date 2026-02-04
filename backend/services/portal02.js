const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PORTAL02_BASE_URL = process.env.PORTAL02_BASE_URL;
const PORTAL02_API_KEY = process.env.PORTAL02_API_KEY;

const portal02Service = {
    /**
     * Fetch all available bundles from Portal02
     */
    syncBundles: async () => {
        try {
            const response = await axios.get(`${PORTAL02_BASE_URL}/offers`, {
                headers: { 'Authorization': `Bearer ${PORTAL02_API_KEY}` }
            });
            return response.data.offers; // Extracted based on official documentation
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
