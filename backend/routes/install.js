const express = require('express');
const { getStatus, install } = require('../controllers/install');

const router = express.Router();

router.get('/status', getStatus);
router.post('/', install);

module.exports = router;
