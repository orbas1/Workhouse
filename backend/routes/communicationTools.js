const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { requireSession } = require('../middleware/communicationTools');
const {
  startVideoCallHandler,
  endVideoCallHandler,
  exchangeContactHandler,
  getMessageTemplateHandler,
  createLanguageRoomHandler,
  getCommunicationHistoryHandler,
  translateMessageHandler,
  getSessionAnalyticsHandler,
} = require('../controllers/communicationTools');
const {
  videoStartSchema,
  contactExchangeSchema,
  languageRoomSchema,
  translateSchema,
} = require('../validation/communicationTools');

router.post('/video/start/:sessionId', auth, validate(videoStartSchema), startVideoCallHandler);
router.post('/video/end/:sessionId', auth, requireSession, endVideoCallHandler);
router.post('/contact/exchange/:sessionId', auth, requireSession, validate(contactExchangeSchema), exchangeContactHandler);
router.get('/message/template', auth, getMessageTemplateHandler);
router.post('/room/language-specific', auth, validate(languageRoomSchema), createLanguageRoomHandler);
router.get('/history/:userId', auth, getCommunicationHistoryHandler);
router.post('/language/translate', auth, validate(translateSchema), translateMessageHandler);
router.get('/analytics/:sessionId', auth, getSessionAnalyticsHandler);

module.exports = router;
