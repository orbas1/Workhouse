const volunteerService = require('../services/volunteer');
const logger = require('../utils/logger');

function ensureVolunteerExists(req, res, next) {
  const userId = req.user?.id || req.user?.username;
  if (!volunteerService.volunteerExists(userId)) {
    logger.error('Volunteer profile not found', { userId });
    return res.status(404).json({ error: 'Volunteer profile not found' });
  }
  next();
}

function preventDuplicateProfile(req, res, next) {
  const userId = req.user?.id || req.user?.username;
  if (volunteerService.volunteerExists(userId)) {
    logger.error('Volunteer profile already exists', { userId });
    return res.status(400).json({ error: 'Volunteer profile already exists' });
  }
  next();
}

module.exports = {
  ensureVolunteerExists,
  preventDuplicateProfile,
};
