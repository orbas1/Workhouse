const express = require('express');
const router = express.Router();
const { globalSearchHandler } = require('../controllers/globalSearch');

router.get('/global', globalSearchHandler);

module.exports = router;
