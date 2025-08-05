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
router.get('/privacy-settings', auth, getPrivacySettingsHandler);
router.put('/privacy-settings', auth, validate(privacySettingsSchema), updatePrivacySettingsHandler);

module.exports = router;
