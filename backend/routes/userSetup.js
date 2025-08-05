const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { saveFinancialMediaSetup, getFinancialMediaSetup } = require('../controllers/userSetup');
const { userIdParamSchema, financialMediaSchema } = require('../validation/userSetup');

const router = express.Router();

router.post(
  '/:userId/financial-media',
  auth,
  validate(userIdParamSchema, 'params'),
  validate(financialMediaSchema),
  saveFinancialMediaSetup
);

router.get(
  '/:userId/financial-media',
  auth,
  validate(userIdParamSchema, 'params'),
  getFinancialMediaSetup
);

module.exports = router;
