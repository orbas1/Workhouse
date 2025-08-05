const express = require('express');
const controller = require('../controllers/serviceProviderAnalytics');
const authenticate = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validateRequest');
const schemas = require('../validation/serviceProviderAnalytics');

const router = express.Router();

router.get('/analytics', authenticate, requireRole('service_provider'), controller.getAnalytics);
router.post('/services', authenticate, requireRole('service_provider'), validate(schemas.serviceCreationSchema), controller.createService);
router.put('/services/:serviceId', authenticate, requireRole('service_provider'), validate(schemas.serviceUpdateSchema), controller.updateService);
router.put('/services/:serviceId/pricing', authenticate, requireRole('service_provider'), validate(schemas.pricingUpdateSchema), controller.updatePricing);
router.post('/calendar/availability', authenticate, requireRole('service_provider'), validate(schemas.availabilitySchema), controller.setAvailability);
router.post('/bookings', authenticate, requireRole('client'), validate(schemas.bookingSchema), controller.createBooking);
router.post('/portfolio', authenticate, requireRole('service_provider'), validate(schemas.portfolioSchema), controller.addPortfolioItem);
router.get('/portfolio/:providerId', controller.getPortfolio);
router.post('/testimonials', authenticate, requireRole('client'), validate(schemas.testimonialSchema), controller.addTestimonial);
router.get('/testimonials/:providerId', controller.getTestimonials);
router.post('/services/:serviceId/customize', authenticate, requireRole('client'), validate(schemas.customizationSchema), controller.customizeService);
router.post('/chat/initiate', authenticate, validate(schemas.chatInitSchema), controller.initiateChat);

module.exports = router;
