const express = require('express');
const { getLandingContent } = require('../controllers/landing');

const router = express.Router();

router.get('/content', getLandingContent);

module.exports = router;
