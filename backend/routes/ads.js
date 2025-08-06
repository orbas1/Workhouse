const express = require('express');
const auth = require('../middleware/auth');
const { billingHandler, analyticsHandler, libraryHandler } = require('../controllers/ads');

const router = express.Router();

router.get('/billing', auth, billingHandler);
router.get('/analytics', auth, analyticsHandler);
router.get('/library', auth, libraryHandler);
const router = express.Router();
const controller = require('../controllers/ads');

router.get('/', controller.getAds);
router.get('/preferences', controller.getPreferences);
router.post('/preferences', controller.updatePreferences);

const { createAd, getAd, updateAd } = require('../models/ad');
const { validateAd } = require('../validators/adValidator');

const router = express.Router();

router.post('/groups/:groupId/ads', (req, res) => {
  const { groupId } = req.params;
  const error = validateAd(req.body);
  if (error) return res.status(400).json({ error });
  const ad = createAd(groupId, req.body);
  res.status(201).json(ad);
});

router.get('/groups/:groupId/ads/:adId', (req, res) => {
  const { groupId, adId } = req.params;
  const ad = getAd(groupId, adId);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  res.json(ad);
});

router.put('/groups/:groupId/ads/:adId', (req, res) => {
  const { groupId, adId } = req.params;
  const error = validateAd(req.body);
  if (error) return res.status(400).json({ error });
  const ad = updateAd(groupId, adId, req.body);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  res.json(ad);
});

module.exports = router;
