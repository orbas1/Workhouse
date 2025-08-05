const communicationService = require('../services/communication');

function requireConversation(req, res, next) {
  const conversationId = req.params.conversationId || req.body.conversationId;
  const conversation = communicationService.getConversation(conversationId);
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }
  const userId = req.user?.id || req.user?.username;
  if (userId && !conversation.participants.includes(userId)) {
    return res.status(403).json({ error: 'Access to conversation denied' });
  }
  req.conversation = conversation;
  next();
}

function requireMeeting(req, res, next) {
  const { meetingId } = req.params;
  communicationService
    .getMeeting(meetingId)
    .then((meeting) => {
      if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }
      req.meeting = meeting;
      next();
    })
    .catch(next);
}

function requireCall(req, res, next) {
  const { callId } = req.params;
  communicationService
    .getCall(callId)
    .then((call) => {
      if (!call) {
        return res.status(404).json({ error: 'Call not found' });
      }
      req.call = call;
      next();
    })
    .catch(next);
}

module.exports = { requireConversation, requireMeeting, requireCall };
