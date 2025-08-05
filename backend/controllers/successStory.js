const {
  submitSuccessStory,
  listSuccessStories,
  getSuccessStory,
} = require('../services/successStory');
const logger = require('../utils/logger');

async function submitSuccessStoryHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const story = await submitSuccessStory(userId, req.body);
    res.status(201).json(story);
  } catch (err) {
    logger.error('Failed to submit success story', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function listSuccessStoriesHandler(req, res) {
  try {
    const stories = await listSuccessStories();
    res.json(stories);
  } catch (err) {
    logger.error('Failed to list success stories', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getSuccessStoryHandler(req, res) {
  res.json(req.successStory);
}

module.exports = {
  submitSuccessStoryHandler,
  listSuccessStoriesHandler,
  getSuccessStoryHandler,
};
