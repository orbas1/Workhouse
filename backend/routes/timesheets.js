const express = require('express');
const { logTimesheetHandler, getTimesheetsHandler } = require('../controllers/timesheet');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { logSchema } = require('../validation/timesheet');

const router = express.Router({ mergeParams: true });

router.get('/', auth, getTimesheetsHandler);
router.post('/', auth, validate(logSchema), logTimesheetHandler);

module.exports = router;
