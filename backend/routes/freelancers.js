const express = require('express');
const { searchFreelancersHandler } = require('../controllers/freelancers');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { searchFreelancersSchema } = require('../validation/freelancers');

const router = express.Router();

router.get('/search', auth, validate(searchFreelancersSchema, 'query'), searchFreelancersHandler);

module.exports = router;
