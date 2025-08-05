const { randomUUID } = require('crypto');

// In-memory store for investor feedback
const investorFeedbacks = [];

function addFeedback(eventId, { investorId, rating, comment }) {
  const record = {
    id: randomUUID(),
    eventId,
    investorId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  investorFeedbacks.push(record);
  return record;
}

function getFeedbackByEvent(eventId) {
  return investorFeedbacks.filter(f => f.eventId === eventId);
}

module.exports = {
  addFeedback,
  getFeedbackByEvent,
};
