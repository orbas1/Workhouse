const express = require('express');
const { body } = require('express-validator');
const {
  getOnboardingMaterials,
  registerWebinar
} = require('../controllers/onboarding');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/onboarding', auth, getOnboardingMaterials);

router.post(
  '/webinar/register',
  auth,
  body('webinarId').isInt().withMessage('webinarId must be an integer'),
  validate,
  registerWebinar
);

module.exports = router;
