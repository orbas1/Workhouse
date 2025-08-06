const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { getSettingsHandler, updateSettingsHandler } = require('../controllers/settings');
const { updateSettingsSchema } = require('../validation/settings');

const router = express.Router();

router.get('/', auth, getSettingsHandler);
router.put('/', auth, validate(updateSettingsSchema), updateSettingsHandler);

module.exports = router;
