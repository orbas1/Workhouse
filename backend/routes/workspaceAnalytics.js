const express = require('express');
const {
  getOverviewHandler,
  getDetailsHandler,
  getCollaborationHandler,
} = require('../controllers/workspaceAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { workspaceIdParamSchema } = require('../validation/workspaceAnalytics');

const router = express.Router();

router.get('/overview', auth, authorize('admin', 'workspace-manager'), getOverviewHandler);
router.get('/details/:workspaceId', auth, authorize('admin', 'workspace-manager'), validate(workspaceIdParamSchema, 'params'), getDetailsHandler);
router.get('/collaboration/:workspaceId', auth, authorize('admin', 'workspace-manager'), validate(workspaceIdParamSchema, 'params'), getCollaborationHandler);

module.exports = router;
