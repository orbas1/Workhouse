const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '' });
});

module.exports = router;
