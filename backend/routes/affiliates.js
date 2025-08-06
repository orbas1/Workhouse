const express = require('express');
const {
  registerAffiliateHandler,
  getAffiliateHandler,
  updateAffiliateHandler,
  updateAgreementHandler,
  listCompetitionsHandler,
} = require('../controllers/affiliate');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  registerSchema,
  updateSchema,
  agreementSchema,
} = require('../validation/affiliate');

const router = express.Router();

router.post('/register', validate(registerSchema), registerAffiliateHandler);
router.get('/:affiliateId', auth, getAffiliateHandler);
router.put('/:affiliateId/update', auth, validate(updateSchema), updateAffiliateHandler);
router.post('/agreements/update', auth, validate(agreementSchema), updateAgreementHandler);
router.get('/competitions', auth, listCompetitionsHandler);

module.exports = router;
