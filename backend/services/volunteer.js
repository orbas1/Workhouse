const volunteerModel = require('../models/volunteer');
const logger = require('../utils/logger');

async function registerVolunteer(userId, data) {
  const profile = volunteerModel.createVolunteer(userId, data);
  logger.info('Volunteer registered', { userId });
  return profile;
}

async function getVolunteerProfile(userId) {
  return volunteerModel.getVolunteerByUserId(userId);
}

async function updateVolunteerProfile(userId, updates) {
  const profile = volunteerModel.updateVolunteer(userId, updates);
  if (!profile) {
    throw new Error('Volunteer profile not found');
  }
  logger.info('Volunteer profile updated', { userId });
  return profile;
}

async function findVolunteerMatches(userId) {
  const matches = volunteerModel.findMatches(userId);
  logger.info('Volunteer matches calculated', { userId, count: matches.length });
  return matches;
}

function volunteerExists(userId) {
  return volunteerModel.volunteerExists(userId);
}

module.exports = {
  registerVolunteer,
  getVolunteerProfile,
  updateVolunteerProfile,
  findVolunteerMatches,
  volunteerExists,
};
