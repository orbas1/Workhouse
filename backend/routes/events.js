const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validate = require('../middleware/validateSchema');
const eventExists = require('../middleware/eventExists');
const eventController = require('../controllers/eventManagement');
const {
  createEventSchema,
  updateEventSchema,
  agendaSchema,
  paymentSchema,
  feedbackSchema
} = require('../validators/eventValidator');

router.post('/create', auth, validate(createEventSchema), eventController.createEvent);
router.get('/templates', eventController.getTemplates);
router.put('/update/:eventId', auth, eventExists, validate(updateEventSchema), eventController.updateEvent);
router.delete('/:eventId', auth, eventExists, eventController.deleteEvent);
router.post('/agenda/:eventId', auth, eventExists, validate(agendaSchema), eventController.configureAgenda);
router.get('/filter', eventController.filterEvents);
router.post('/payment/setup/:eventId', auth, eventExists, validate(paymentSchema), eventController.setupPayment);
router.get('/upcoming', eventController.getUpcomingEvents);
router.post('/feedback/collect/:eventId', auth, eventExists, validate(feedbackSchema), eventController.collectFeedback);
router.get('/history/:userId', auth, eventController.getEventHistory);

module.exports = router;
