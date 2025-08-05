const model = require('../models/matchingEngine');
const logger = require('../utils/logger');

async function runMatching(userId) {
  const matches = model.runAutoMatching();
  logger.info('Auto matching executed', { userId, matches: matches.length });
  return matches;
}

async function searchProfiles(filters) {
  return model.searchProfiles(filters);
}

async function sendInvitation(senderId, recipientId, message) {
  const invitation = model.createInvitation({ senderId, recipientId, message });
  logger.info('Invitation sent', { senderId, recipientId, invitationId: invitation.id });
  return invitation;
}

async function setupTrialSession(details) {
  const session = model.createTrialSession(details);
  logger.info('Trial session scheduled', { sessionId: session.id });
  return session;
}

async function getManualMatches(userId) {
  return model.getManualMatches(userId);
}

async function respondInvitation(invitationId, userId, status) {
  const invitation = model.findInvitation(invitationId);
  if (!invitation) {
    throw new Error('Invitation not found');
  }
  if (invitation.recipientId !== userId) {
    throw new Error('Not authorized to respond to this invitation');
  }
  const updated = model.updateInvitation(invitationId, { status, respondedAt: new Date() });
  let match = null;
  if (status === 'accepted') {
    const senderProfile = model.getProfile(invitation.senderId);
    const recipientProfile = model.getProfile(invitation.recipientId);
    if (senderProfile && recipientProfile) {
      const mentorId = senderProfile.role === 'mentor' ? senderProfile.id : recipientProfile.id;
      const menteeId = senderProfile.role === 'mentee' ? senderProfile.id : recipientProfile.id;
      match = model.createMatch({ mentorId, menteeId, score: null });
    }
  }
  logger.info('Invitation responded', { invitationId, status });
  return { invitation: updated, match };
}

async function getMatchHistory(userId) {
  return model.getMatchHistory(userId);
}

module.exports = {
  runMatching,
  searchProfiles,
  sendInvitation,
  setupTrialSession,
  getManualMatches,
  respondInvitation,
  getMatchHistory,
};

