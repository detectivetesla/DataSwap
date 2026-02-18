const express = require('express');
const router = express.Router();
const portal02Controller = require('../controllers/portal02Controller');

router.post('/webhook', portal02Controller.handleWebhook);

module.exports = router;
