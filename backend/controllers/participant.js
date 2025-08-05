const {
  registerParticipant,
  setPreferences,
  getPreEventMatches,
  joinWaitlist,
  processRegistrationPayment,
  getParticipantProfile,
  updateParticipantProfile,
  cancelRegistration,
} = require('../services/participant');
const logger = require('../utils/logger');

async function registerParticipantHandler(req, res) {
  const { eventId } = req.params;
  const userId = req.user?.username;
  try {
    const participant = await registerParticipant(eventId, userId, req.body);
    res.status(201).json(participant);
  } catch (err) {
    logger.error('Failed to register participant', { error: err.message, eventId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function setPreferencesHandler(req, res) {
  const { userId } = req.params;
  try {
    const participant = await setPreferences(userId, req.body);
    res.json(participant);
  } catch (err) {
    logger.error('Failed to update preferences', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getPreEventMatchesHandler(req, res) {
  const { eventId } = req.params;
  const userId = req.user?.username;
  try {
    const matches = await getPreEventMatches(eventId, userId);
    res.json(matches);
  } catch (err) {
    logger.error('Failed to get pre-event matches', { error: err.message, eventId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function joinWaitlistHandler(req, res) {
  const { eventId } = req.params;
  const userId = req.user?.username;
  try {
    const result = await joinWaitlist(eventId, userId);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Failed to join waitlist', { error: err.message, eventId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function processPaymentHandler(req, res) {
  const { eventId } = req.params;
  const userId = req.user?.username;
  try {
    const participant = await processRegistrationPayment(eventId, userId, req.body);
    res.json(participant);
  } catch (err) {
    logger.error('Failed to process payment', { error: err.message, eventId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function viewProfileHandler(req, res) {
  const { userId } = req.params;
  try {
    const participant = await getParticipantProfile(userId);
    res.json(participant);
  } catch (err) {
    logger.error('Failed to view profile', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function updateProfileHandler(req, res) {
  const { userId } = req.params;
  try {
    const participant = await updateParticipantProfile(userId, req.body);
    res.json(participant);
  } catch (err) {
    logger.error('Failed to update profile', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function cancelRegistrationHandler(req, res) {
  const { eventId } = req.params;
  const userId = req.user?.username;
  try {
    const participant = await cancelRegistration(eventId, userId);
    res.json(participant);
  } catch (err) {
    logger.error('Failed to cancel registration', { error: err.message, eventId, userId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  registerParticipantHandler,
  setPreferencesHandler,
  getPreEventMatchesHandler,
  joinWaitlistHandler,
  processPaymentHandler,
  viewProfileHandler,
  updateProfileHandler,
  cancelRegistrationHandler,
};

