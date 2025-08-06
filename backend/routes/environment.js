const express = require('express');
const { setup } = require('../controllers/environment');

const router = express.Router();

router.post('/setup', setup);

module.exports = router;
