const participantModel = require('../models/participant');
const logger = require('../utils/logger');

async function registerParticipant(eventId, userId, profile) {
  const participant = participantModel.register(eventId, userId, profile);
  logger.info('Participant registered', { eventId, userId });
  return participant;
}

async function setPreferences(userId, preferences) {
  const participant = participantModel.updatePreferences(userId, preferences);
  if (!participant) {
    throw new Error('Participant not found');
  }
  logger.info('Participant preferences updated', { userId });
  return participant;
}

async function getPreEventMatches(eventId, userId) {
  const participants = participantModel.listByEvent(eventId).filter(
    (p) => p.userId !== userId
  );
  // simple random sample up to 5 matches
  const shuffled = participants.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

async function joinWaitlist(eventId, userId) {
  const result = participantModel.addToWaitlist(eventId, userId);
  logger.info('User added to waitlist', { eventId, userId });
  return result;
}

async function processRegistrationPayment(eventId, userId, payment) {
  const participant = participantModel.processPayment(eventId, userId, payment);
  if (!participant) {
    throw new Error('Participant not found');
  }
  logger.info('Registration payment processed', { eventId, userId, amount: payment.amount });
  return participant;
}

async function getParticipantProfile(userId) {
  const participant = participantModel.findByUser(userId);
  if (!participant) {
    throw new Error('Participant not found');
  }
  return participant;
}

async function updateParticipantProfile(userId, updates) {
  const participant = participantModel.updateProfile(userId, updates);
  if (!participant) {
    throw new Error('Participant not found');
  }
  logger.info('Participant profile updated', { userId });
  return participant;
}

async function cancelRegistration(eventId, userId) {
  const participant = participantModel.cancelRegistration(eventId, userId);
  if (!participant) {
    throw new Error('Participant not found');
  }
  logger.info('Participant registration cancelled', { eventId, userId });
  return participant;
}

module.exports = {
  registerParticipant,
  setPreferences,
  getPreEventMatches,
  joinWaitlist,
  processRegistrationPayment,
  getParticipantProfile,
  updateParticipantProfile,
  cancelRegistration,
};

