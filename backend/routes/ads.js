const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/ads');
const { validateAd } = require('../validators/adValidator');
const { createAd, getAd, updateAd } = require('../models/ad');

const router = express.Router();

router.get('/billing', auth, controller.billingHandler);
router.get('/analytics', auth, controller.analyticsHandler);
router.get('/library', auth, controller.libraryHandler);

router.get('/', auth, controller.getAds);
router.get('/preferences', auth, controller.getPreferences);
router.post('/preferences', auth, controller.updatePreferences);

router.post('/campaigns', auth, controller.createCampaign);
router.put('/campaigns/:id', auth, controller.updateCampaign);

router.post('/groups/:groupId/ads', auth, (req, res) => {
  const { groupId } = req.params;
  const error = validateAd(req.body);
  if (error) return res.status(400).json({ error });
  const ad = createAd(groupId, req.body);
  res.status(201).json(ad);
});

router.get('/groups/:groupId/ads/:adId', auth, (req, res) => {
  const { groupId, adId } = req.params;
  const ad = getAd(groupId, adId);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  res.json(ad);
});

router.put('/groups/:groupId/ads/:adId', auth, (req, res) => {
  const { groupId, adId } = req.params;
  const error = validateAd(req.body);
  if (error) return res.status(400).json({ error });
  const ad = updateAd(groupId, adId, req.body);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  res.json(ad);
});

module.exports = router;

