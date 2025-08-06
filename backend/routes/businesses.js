const express = require('express');
const router = express.Router();
const controller = require('../controllers/businesses');

router.post('/businesses', controller.createBusiness);
router.post('/businesses/:id/providers', controller.addProvider);
router.put('/businesses/:id/zone', controller.setZone);

module.exports = router;
