const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { eventSchema } = require('../validation/educationSchedule');
const { listEvents, createEvent } = require('../controllers/educationSchedule');

const router = express.Router();

router.get('/schedule', auth, listEvents);
router.post('/schedule', auth, validate(eventSchema), createEvent);

module.exports = router;
