const {
  registerVolunteer,
  getVolunteerProfile,
  updateVolunteerProfile,
  findVolunteerMatches,
} = require('../services/volunteer');
const logger = require('../utils/logger');

async function createVolunteerHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const profile = await registerVolunteer(userId, req.body);
    logger.info('Volunteer profile created', { userId });
    res.status(201).json(profile);
  } catch (err) {
    logger.error('Failed to create volunteer profile', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getVolunteerProfileHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const profile = await getVolunteerProfile(userId);
    if (!profile) {
      logger.error('Volunteer profile not found', { userId });
      return res.status(404).json({ error: 'Volunteer profile not found' });
    }
    res.json(profile);
  } catch (err) {
    logger.error('Failed to retrieve volunteer profile', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
}

async function updateVolunteerProfileHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const profile = await updateVolunteerProfile(userId, req.body);
    logger.info('Volunteer profile updated', { userId });
    res.json(profile);
  } catch (err) {
    logger.error('Failed to update volunteer profile', { error: err.message, userId });
    if (err.message === 'Volunteer profile not found') {
      return res.status(404).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
}

async function matchVolunteerHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const matches = await findVolunteerMatches(userId);
    res.json({ matches });
  } catch (err) {
    logger.error('Failed to find volunteer matches', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to find matches' });
  }
}

module.exports = {
  createVolunteerHandler,
  getVolunteerProfileHandler,
  updateVolunteerProfileHandler,
  matchVolunteerHandler,
};
