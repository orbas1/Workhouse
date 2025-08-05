const {
  submitGoalFeedback,
  reviewGoalFeedback,
  makeGoalAdjustment,
  submitModuleFeedback,
  listModuleFeedbackActions,
} = require('../services/userFeedbackAdjustment');
const logger = require('../utils/logger');

async function submitGoalFeedbackHandler(req, res) {
  const { goalId } = req.params;
  try {
    const feedback = await submitGoalFeedback(goalId, req.body);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit goal feedback', { error: err.message, goalId });
    res.status(400).json({ error: err.message });
  }
}

async function reviewGoalFeedbackHandler(req, res) {
  const { goalId } = req.params;
  try {
    const feedback = await reviewGoalFeedback(goalId);
    res.json(feedback);
  } catch (err) {
    logger.error('Failed to retrieve goal feedback', { error: err.message, goalId });
    res.status(400).json({ error: err.message });
  }
}

async function makeGoalAdjustmentHandler(req, res) {
  const { goalId } = req.params;
  try {
    const adjustment = await makeGoalAdjustment(goalId, req.body);
    res.status(201).json(adjustment);
  } catch (err) {
    logger.error('Failed to make goal adjustment', { error: err.message, goalId });
    res.status(400).json({ error: err.message });
  }
}

async function submitModuleFeedbackHandler(req, res) {
  try {
    const feedback = await submitModuleFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit module feedback', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listModuleFeedbackActionsHandler(req, res) {
  try {
    const actions = await listModuleFeedbackActions();
    res.json(actions);
  } catch (err) {
    logger.error('Failed to retrieve module feedback actions', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitGoalFeedbackHandler,
  reviewGoalFeedbackHandler,
  makeGoalAdjustmentHandler,
  submitModuleFeedbackHandler,
  listModuleFeedbackActionsHandler,
};
