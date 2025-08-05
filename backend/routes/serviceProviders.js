const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceProviders');

router.post('/services', controller.createService);
router.get('/services', controller.listServices);
router.get('/services/:id', controller.getServiceById);
router.put('/services/:id', controller.updateService);
router.delete('/services/:id', controller.deleteService);

module.exports = router;
