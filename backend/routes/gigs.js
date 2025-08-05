const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMyGigsHandler, getAppliedGigsHandler } = require('../controllers/gigs');

router.get('/my-gigs', auth, getMyGigsHandler);
router.get('/applied', auth, getAppliedGigsHandler);

module.exports = router;
