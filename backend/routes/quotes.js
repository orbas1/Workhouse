const express = require('express');
const auth = require('../middleware/auth');
const { getRandomQuoteHandler } = require('../controllers/quotes');

const router = express.Router();

router.get('/random', auth, getRandomQuoteHandler);

module.exports = router;
