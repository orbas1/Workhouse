const successStoryModel = require('../models/successStory');
const logger = require('../utils/logger');

async function submitSuccessStory(userId, data) {
  const story = successStoryModel.createSuccessStory({ userId, ...data });
  logger.info('Success story submitted', { storyId: story.id, userId });
  return story;
}

async function listSuccessStories() {
  const stories = successStoryModel.listSuccessStories();
  logger.info('Retrieved success stories', { count: stories.length });
  return stories;
}

async function getSuccessStory(storyId) {
  return successStoryModel.getSuccessStoryById(storyId);
}

module.exports = {
  submitSuccessStory,
  listSuccessStories,
  getSuccessStory,
};
