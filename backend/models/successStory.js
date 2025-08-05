const { randomUUID } = require('crypto');

const successStories = new Map();

function createSuccessStory({ userId, title, content, tags = [] }) {
  const id = randomUUID();
  const now = new Date();
  const story = { id, userId, title, content, tags, createdAt: now, updatedAt: now };
  successStories.set(id, story);
  return story;
}

function listSuccessStories() {
  return Array.from(successStories.values());
}

function getSuccessStoryById(id) {
  return successStories.get(id);
}

module.exports = {
  createSuccessStory,
  listSuccessStories,
  getSuccessStoryById,
};
