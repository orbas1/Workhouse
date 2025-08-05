const express = require('express');
const { getLinks, createLink } = require('../controllers/link');
const authenticate = require('../middleware/auth');
const validateLink = require('../middleware/validateLink');

const router = express.Router();

router.get('/:affiliateId/links', authenticate, getLinks);
router.post('/:affiliateId/links/create', authenticate, validateLink, createLink);

module.exports = router;
