const express = require('express');
const {
  protectionPolicyUpdateHandler,
  getPrivacySettingsHandler,
  updatePrivacySettingsHandler,
} = require('../controllers/dataProtection');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const validate = require('../middleware/validate');
const {
  policyUpdateSchema,
  privacySettingsSchema,
} = require('../validation/dataProtection');

const router = express.Router();

router.post('/protection-policy-update', auth, requireAdmin, validate(policyUpdateSchema), protectionPolicyUpdateHandler);
// Split privacy settings routes to avoid duplicate path names
router.get('/privacy-settings/view', auth, getPrivacySettingsHandler);
router.put(
  '/privacy-settings/update',
  auth,
  validate(privacySettingsSchema),
  updatePrivacySettingsHandler
);

module.exports = router;
