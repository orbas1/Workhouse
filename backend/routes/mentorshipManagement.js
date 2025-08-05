const express = require('express');
const {
  getOverviewHandler,
  createInitiativeHandler,
  getEfficacyReportHandler,
} = require('../controllers/mentorshipManagement');
const auth = require('../middleware/auth');
const requireProgramAdmin = require('../middleware/requireProgramAdmin');
const validate = require('../middleware/validate');
const { createInitiativeSchema } = require('../validation/mentorshipManagement');

const router = express.Router();

router.get('/mentorship/overview', auth, requireProgramAdmin, getOverviewHandler);
router.post('/mentorship/initiatives/create', auth, requireProgramAdmin, validate(createInitiativeSchema), createInitiativeHandler);
router.get('/mentorship/efficacy/report', auth, requireProgramAdmin, getEfficacyReportHandler);

module.exports = router;
