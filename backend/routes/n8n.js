const express = require('express');
const { setupN8nHandler } = require('../controllers/n8n');

const router = express.Router();

router.post('/setup', setupN8nHandler);

module.exports = router;
