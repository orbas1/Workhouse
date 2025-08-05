const { randomUUID } = require('crypto');

// In-memory data stores for goals, feedback, and actions
const goals = [];
const moduleFeedback = [];
const moduleActions = [];

function createGoal({ id = randomUUID(), title = '' }) {
  const goal = { id, title, feedback: [], adjustments: [] };
  goals.push(goal);
  return goal;
}

function getGoal(goalId) {
  return goals.find(g => g.id === goalId);
}

function addGoalFeedback(goalId, { userId, rating, comment }) {
  const goal = getGoal(goalId);
  if (!goal) return null;
  const record = {
    id: randomUUID(),
    userId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  goal.feedback.push(record);
  return record;
}

function getGoalFeedback(goalId) {
  const goal = getGoal(goalId);
  return goal ? goal.feedback : null;
}

function addGoalAdjustment(goalId, { adjustment }) {
  const goal = getGoal(goalId);
  if (!goal) return null;
  const record = {
    id: randomUUID(),
    adjustment,
    createdAt: new Date(),
  };
  goal.adjustments.push(record);
  moduleActions.push({
    id: randomUUID(),
    action: `Adjustment for goal ${goalId}: ${adjustment}`,
    createdAt: new Date(),
  });
  return record;
}

function addModuleFeedback({ userId, rating, comment }) {
  const record = {
    id: randomUUID(),
    userId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  moduleFeedback.push(record);
  return record;
}

function listModuleFeedbackActions() {
  return moduleActions;
}

module.exports = {
  createGoal,
  getGoal,
  addGoalFeedback,
  getGoalFeedback,
  addGoalAdjustment,
  addModuleFeedback,
  listModuleFeedbackActions,
};
