const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validate = require('../middleware/validateSchema');
const eventExists = require('../middleware/eventExists');
const eventController = require('../controllers/eventManagement');
const investorEventController = require('../controllers/event');
const eventItemExists = require('../middleware/eventItemExists');
const {
  createEventSchema,
  updateEventSchema,
  agendaSchema,
  paymentSchema,
  feedbackSchema
} = require('../validators/eventValidator');
const {
  pitchEventSchema,
  networkingEventSchema,
  workshopEventSchema,
  livestreamSchema,
  questionSchema,
} = require('../validators/eventController');

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

// Stage 86 Event Controller routes
router.post('/pitch/create', auth, validate(pitchEventSchema), investorEventController.createPitchEvent);
router.get('/pitch/:eventId', eventItemExists, investorEventController.getPitchEvent);
router.post('/pitch/attend/:eventId', auth, eventItemExists, investorEventController.attendPitchEvent);
router.post('/pitch/livestream/:eventId', auth, eventItemExists, validate(livestreamSchema), investorEventController.setupPitchLivestream);
router.get('/pitch/livestream/:eventId', eventItemExists, investorEventController.getPitchLivestream);

router.post('/networking/create', auth, validate(networkingEventSchema), investorEventController.createNetworkingEvent);
router.get('/networking', investorEventController.listNetworkingEvents);
router.get('/networking/:eventId', eventItemExists, investorEventController.getNetworkingEvent);
router.post('/networking/attend/:eventId', auth, eventItemExists, investorEventController.attendNetworkingEvent);
router.get('/networking', auth, investorEventController.listNetworkingEvents);

router.post('/workshop/create', auth, validate(workshopEventSchema), investorEventController.createWorkshop);
router.get('/workshop/:eventId', eventItemExists, investorEventController.getWorkshop);

router.post('/q&a/:eventId', auth, eventItemExists, validate(questionSchema), investorEventController.submitQuestion);
router.get('/q&a/:eventId', eventItemExists, investorEventController.getQuestions);

module.exports = router;
