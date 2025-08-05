const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const loadCustomReport = require('../middleware/loadCustomReport');
const controller = require('../controllers/externalDataML');
const {
  analyzeExternalDataSchema,
  createReportSchema,
  updateReportSchema,
  reportIdParamSchema,
} = require('../validation/externalDataML');

// Analyze external data
router.post(
  '/ml/external-data/analyze',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(analyzeExternalDataSchema),
  controller.analyzeExternalData
);

// Custom analytics reports CRUD
router.get(
  '/analytics/custom-reports',
  auth,
  authorize('admin', 'analytics-manager'),
  controller.listReports
);

router.get(
  '/analytics/custom-reports/:reportId',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(reportIdParamSchema, 'params'),
  loadCustomReport,
  controller.getReportById
);

router.post(
  '/analytics/custom-reports',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(createReportSchema),
  controller.createReport
);

router.put(
  '/analytics/custom-reports/:reportId',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(reportIdParamSchema, 'params'),
  loadCustomReport,
  validate(updateReportSchema),
  controller.updateReport
);

router.delete(
  '/analytics/custom-reports/:reportId',
  auth,
  authorize('admin', 'analytics-manager'),
  validate(reportIdParamSchema, 'params'),
  loadCustomReport,
  controller.deleteReport
);

module.exports = router;
