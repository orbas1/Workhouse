const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  requireConversation,
  requireMeeting,
  requireCall,
} = require('../middleware/communication');
const {
  sendMessageHandler,
  getConversationMessagesHandler,
  listTemplatesHandler,
  sendTemplateMessageHandler,
  scheduleMeetingHandler,
  getMeetingHandler,
  scheduleCallHandler,
  getCallHandler,
} = require('../controllers/communication');
const {
  messageSchema,
  conversationIdParamSchema,
  templateMessageSchema,
  scheduleMeetingSchema,
  meetingIdParamSchema,
  scheduleCallSchema,
  callIdParamSchema,
} = require('../validation/communication');

const router = express.Router();

router.post('/messages/send', auth, validate(messageSchema), sendMessageHandler);
router.get(
  '/messages/conversation/:conversationId',
  auth,
  validate(conversationIdParamSchema, 'params'),
  requireConversation,
  getConversationMessagesHandler
);
router.get('/messages/templates', auth, listTemplatesHandler);
router.post(
  '/messages/send/template',
  auth,
  validate(templateMessageSchema),
  requireConversation,
  sendTemplateMessageHandler
);
router.post('/meetings/schedule', auth, validate(scheduleMeetingSchema), scheduleMeetingHandler);
router.get(
  '/meetings/:meetingId',
  auth,
  validate(meetingIdParamSchema, 'params'),
  requireMeeting,
  getMeetingHandler
);
router.post('/calls/schedule', auth, validate(scheduleCallSchema), scheduleCallHandler);
router.get(
  '/calls/:callId',
  auth,
  validate(callIdParamSchema, 'params'),
  requireCall,
  getCallHandler
);

module.exports = router;
