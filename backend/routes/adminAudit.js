const express = require('express');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const { auditResultsHandler } = require('../controllers/security');

const router = express.Router();

// GET /admin/audit-logs
router.get('/audit-logs', auth, requireAdmin, auditResultsHandler);

module.exports = router;
