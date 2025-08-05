const { calculateEngagementScores, answerCommunityQuestion } = require('../services/communityEngagementML');
const logger = require('../utils/logger');

async function getEngagementScoresHandler(req, res) {
  const { communityId } = req.query;
  try {
    const scores = await calculateEngagementScores(communityId);
    res.json(scores);
  } catch (err) {
    logger.error('Failed to get engagement scores', { error: err.message, communityId });
    res.status(500).json({ error: 'Failed to calculate engagement scores' });
  }
}

async function questionAnsweringHandler(req, res) {
  const { communityId, question } = req.body;
  try {
    const answer = await answerCommunityQuestion(communityId, question);
    res.json(answer);
  } catch (err) {
    logger.error('Failed to answer community question', { error: err.message, communityId });
    res.status(500).json({ error: 'Failed to answer question' });
  }
}

module.exports = {
  getEngagementScoresHandler,
  questionAnsweringHandler,
};
