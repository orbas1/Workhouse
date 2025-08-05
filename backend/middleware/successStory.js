const { getSuccessStory } = require('../services/successStory');
const logger = require('../utils/logger');

async function successStoryExists(req, res, next) {
  const { storyId } = req.params;
  try {
    const story = await getSuccessStory(storyId);
    if (!story) {
      logger.error('Success story not found', { storyId });
      return res.status(404).json({ error: 'Success story not found' });
    }
    req.successStory = story;
    next();
  } catch (err) {
    logger.error('Error loading success story', { error: err.message, storyId });
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = successStoryExists;
