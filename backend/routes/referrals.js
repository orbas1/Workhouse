const express = require('express');
const { trackReferralHandler, listReferralsHandler } = require('../controllers/referral');
const authenticate = require('../middleware/auth');
const { validateTrackReferral } = require('../middleware/validateReferral');

const router = express.Router();

router.post('/track', authenticate, validateTrackReferral, trackReferralHandler);
router.get('/:affiliateId', authenticate, listReferralsHandler);

module.exports = router;
