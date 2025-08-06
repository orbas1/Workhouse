const express = require('express');
const auth = require('../middleware/auth');
const { getConfigHandler, updateConfigHandler } = require('../controllers/config');

const router = express.Router();

router.get('/', getConfigHandler);
router.put('/', auth, updateConfigHandler);

module.exports = router;
