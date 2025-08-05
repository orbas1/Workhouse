const express = require('express');
const {
  issueCertificateHandler,
  listCertificatesHandler,
} = require('../controllers/assessment');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const validate = require('../middleware/validate');
const ensureAssessmentAccess = require('../middleware/assessment');
const {
  userIdParamSchema,
  certificateIssueSchema,
} = require('../validation/assessment');

const router = express.Router();

router.post('/issue/:userId',
  auth,
  requireAdmin,
  validate(userIdParamSchema, 'params'),
  validate(certificateIssueSchema),
  issueCertificateHandler
);

router.get('/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  ensureAssessmentAccess,
  listCertificatesHandler
);

module.exports = router;

