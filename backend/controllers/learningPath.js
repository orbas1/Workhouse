const {
  createLearningPath,
  updateLearningPath,
  getLearningPath,
  buildLearningPath,
  shareLearningPath,
  getPopularLearningPaths,
  getLearningPathRecommendations,
} = require('../services/learningPath');
const logger = require('../utils/logger');

async function createLearningPathHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const path = await createLearningPath(userId, req.body);
    res.status(201).json(path);
  } catch (err) {
    logger.error('Failed to create learning path', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function updateLearningPathHandler(req, res) {
  const { pathId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const path = await updateLearningPath(pathId, userId, req.body);
    res.json(path);
  } catch (err) {
    logger.error('Failed to update learning path', { error: err.message, pathId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getLearningPathHandler(req, res) {
  const { pathId } = req.params;
  try {
    const path = await getLearningPath(pathId);
    res.json(path);
  } catch (err) {
    logger.error('Failed to get learning path', { error: err.message, pathId });
    res.status(404).json({ error: err.message });
  }
}

async function buildLearningPathHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const path = await buildLearningPath(userId, req.body);
    res.status(201).json(path);
  } catch (err) {
    logger.error('Failed to build learning path', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function shareLearningPathHandler(req, res) {
  const { pathId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const share = await shareLearningPath(pathId, userId, req.body);
    res.status(201).json(share);
  } catch (err) {
    logger.error('Failed to share learning path', { error: err.message, pathId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getPopularLearningPathsHandler(_req, res) {
  try {
    const paths = await getPopularLearningPaths();
    res.json(paths);
  } catch (err) {
    logger.error('Failed to list popular learning paths', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getLearningPathRecommendationsHandler(req, res) {
  const { userId } = req.params;
  try {
    const paths = await getLearningPathRecommendations(userId);
    res.json(paths);
  } catch (err) {
    logger.error('Failed to get learning path recommendations', { error: err.message, userId });
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createLearningPathHandler,
  updateLearningPathHandler,
  getLearningPathHandler,
  buildLearningPathHandler,
  shareLearningPathHandler,
  getPopularLearningPathsHandler,
  getLearningPathRecommendationsHandler,
};
