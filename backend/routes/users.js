const express = require('express');
const auth = require('../middleware/auth');
const { getUserCountHandler } = require('../controllers/users');

const router = express.Router();

router.get('/count', auth, getUserCountHandler);

module.exports = router;
