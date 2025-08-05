const express = require('express');
const { fraudDetectionHandler, privacyComplianceHandler } = require('../controllers/mlSecurity');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { mlSecurityLogger } = require('../middleware/mlSecurity');
const { fraudDetectionQuerySchema, privacyComplianceQuerySchema } = require('../validation/mlSecurity');

const router = express.Router();

router.use(auth);
router.use(authorize('admin', 'security', 'analyst'));
router.use(mlSecurityLogger);

router.get('/fraud-detection', validate(fraudDetectionQuerySchema, 'query'), fraudDetectionHandler);
router.get('/privacy-compliance', validate(privacyComplianceQuerySchema, 'query'), privacyComplianceHandler);

module.exports = router;

