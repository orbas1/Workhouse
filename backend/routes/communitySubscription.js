const express = require('express');
const auth = require('../middleware/auth');
const {
  subscribeHandler,
  checkAccessHandler,
  listSubscribersHandler,
} = require('../controllers/communitySubscription');

const router = express.Router();

router.post('/:communityId/subscribe', auth, subscribeHandler);
router.get('/:communityId/access', auth, checkAccessHandler);
router.get('/:communityId/subscribers', listSubscribersHandler);

module.exports = router;
