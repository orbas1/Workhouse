const {
  trackProgress,
  getUserProgress,
  getCourseProgress,
  getDetailedProgress,
  setLearningGoal,
  getLearningGoals,
} = require('../services/userProgress');
const logger = require('../utils/logger');

async function trackProgressHandler(req, res) {
  try {
    const record = await trackProgress(req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to track progress', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getUserProgressHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getUserProgress(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch user progress', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch user progress' });
  }
}

async function getCourseProgressHandler(req, res) {
  const { courseId, userId } = req.params;
  try {
    const data = await getCourseProgress(courseId, userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch course progress', { error: err.message, courseId, userId });
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
}

async function getDetailedProgressHandler(req, res) {
  const { userId, courseId } = req.params;
  try {
    const data = await getDetailedProgress(userId, courseId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch detailed progress', { error: err.message, courseId, userId });
    res.status(500).json({ error: 'Failed to fetch detailed progress' });
  }
}

async function setLearningGoalHandler(req, res) {
  const { userId } = req.params;
  try {
    const goal = await setLearningGoal(userId, req.body);
    res.status(201).json(goal);
  } catch (err) {
    logger.error('Failed to set learning goal', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getLearningGoalsHandler(req, res) {
  const { userId } = req.params;
  try {
    const goals = await getLearningGoals(userId);
    res.json(goals);
  } catch (err) {
    logger.error('Failed to fetch learning goals', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch learning goals' });
  }
}

module.exports = {
  trackProgressHandler,
  getUserProgressHandler,
  getCourseProgressHandler,
  getDetailedProgressHandler,
  setLearningGoalHandler,
  getLearningGoalsHandler,
};
