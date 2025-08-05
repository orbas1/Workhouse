const express = require('express');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const sessionExists = require('../middleware/session');
const {
  scheduleSessionSchema,
  agendaSchema,
  noteSchema,
  rescheduleSchema,
  materialsRequestSchema,
} = require('../validation/session');
const {
  scheduleSessionHandler,
  setAgendaHandler,
  getRemindersHandler,
  shareNotesHandler,
  rescheduleSessionHandler,
  cancelSessionHandler,
  getUpcomingSessionsHandler,
  requestMaterialsHandler,
} = require('../controllers/sessionManagement');

const router = express.Router();

router.post('/schedule', authenticate, validate(scheduleSessionSchema), scheduleSessionHandler);

router.put('/agenda/set/:sessionId', authenticate, sessionExists, validate(agendaSchema), setAgendaHandler);

router.get('/reminders/:userId', authenticate, getRemindersHandler);

router.post('/notes/share/:sessionId', authenticate, sessionExists, validate(noteSchema), shareNotesHandler);

router.post('/reschedule/:sessionId', authenticate, sessionExists, validate(rescheduleSchema), rescheduleSessionHandler);

router.post('/cancel/:sessionId', authenticate, sessionExists, cancelSessionHandler);

router.get('/upcoming/:userId', authenticate, getUpcomingSessionsHandler);

router.post('/materials/request/:sessionId', authenticate, sessionExists, validate(materialsRequestSchema), requestMaterialsHandler);

module.exports = router;
