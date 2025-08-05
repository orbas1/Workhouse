const { randomUUID } = require('crypto');

const engagementScoreStore = new Map();
const questionAnswerStore = [];

function saveEngagementScores(communityId, scores) {
  const record = {
    id: randomUUID(),
    communityId,
    scores,
    calculatedAt: new Date(),
  };
  engagementScoreStore.set(communityId, record);
  return record;
}

function findEngagementScores(communityId) {
  return engagementScoreStore.get(communityId);
}

function saveQuestionAnswer(communityId, question, answer) {
  const record = {
    id: randomUUID(),
    communityId,
    question,
    answer,
    answeredAt: new Date(),
  };
  questionAnswerStore.push(record);
  return record;
}

module.exports = {
  saveEngagementScores,
  findEngagementScores,
  saveQuestionAnswer,
};
