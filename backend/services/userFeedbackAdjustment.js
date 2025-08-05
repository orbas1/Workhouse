const model = require('../models/userFeedbackAdjustment');
const logger = require('../utils/logger');

async function submitGoalFeedback(goalId, data) {
  const record = model.addGoalFeedback(goalId, data);
  if (!record) {
    throw new Error('Goal not found');
  }
  logger.info('Goal feedback submitted', { goalId, userId: data.userId });
  return record;
}

async function reviewGoalFeedback(goalId) {
  const feedback = model.getGoalFeedback(goalId);
  if (feedback === null) {
    throw new Error('Goal not found');
  }
  logger.info('Goal feedback retrieved', { goalId, count: feedback.length });
  return feedback;
}

async function makeGoalAdjustment(goalId, data) {
  const adjustment = model.addGoalAdjustment(goalId, data);
  if (!adjustment) {
    throw new Error('Goal not found');
  }
  logger.info('Goal adjustment made', { goalId });
  return adjustment;
}

async function submitModuleFeedback(data) {
  const record = model.addModuleFeedback(data);
  logger.info('Module feedback submitted', { userId: data.userId });
  return record;
}

async function listModuleFeedbackActions() {
  const actions = model.listModuleFeedbackActions();
  logger.info('Module feedback actions retrieved', { count: actions.length });
  return actions;
}

module.exports = {
  submitGoalFeedback,
  reviewGoalFeedback,
  makeGoalAdjustment,
  submitModuleFeedback,
  listModuleFeedbackActions,
};
