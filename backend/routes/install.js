const express = require('express');
const { getStatus, install, checkDb } = require('../controllers/install');

const router = express.Router();

router.get('/status', getStatus);
router.post('/', install);
router.post('/check-db', checkDb);

module.exports = router;
