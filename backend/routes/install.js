const express = require('express');
const { getStatus, install, checkDb, permissions } = require('../controllers/install');

const router = express.Router();

router.get('/status', getStatus);
router.post('/', install);
router.post('/check-db', checkDb);
router.get('/permissions', permissions);

module.exports = router;
