const CONFIG = {
    TRANSACTION_FEE_PERCENTAGE: parseFloat(process.env.TRANSACTION_FEE_PERCENTAGE) || 0.02,
    MIN_DEPOSIT_GHC: parseFloat(process.env.MIN_DEPOSIT_GHC) || 5.00,
    CURRENCY: process.env.SYSTEM_CURRENCY || 'GH₵',
    SYSTEM_NAME: process.env.SYSTEM_NAME || 'DataSwap'
};

module.exports = CONFIG;
