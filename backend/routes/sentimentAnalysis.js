const express = require('express');
const {
  getSentimentAnalysisHandler,
  trainSentimentModelHandler,
  getSentimentModelInfoHandler,
  getSentimentHistoryHandler,
  getAggregatedSentimentAnalysisHandler,
  performCustomSentimentAnalysisHandler,
  getSentimentScoresHandler,
  analyzeEmotionalSentimentHandler,
  generateSentimentMapHandler,
  submitSentimentFeedbackHandler,
} = require('../controllers/sentimentAnalysis');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  domainParamSchema,
  trainSchema,
  customTextSchema,
  feedbackSchema,
} = require('../validation/sentimentAnalysis');

const router = express.Router();

router.post('/train', auth, authorize('admin'), validate(trainSchema), trainSentimentModelHandler);
router.get('/model', auth, authorize('admin', 'content-manager'), getSentimentModelInfoHandler);
router.get('/aggregate', auth, authorize('admin', 'content-manager'), getAggregatedSentimentAnalysisHandler);
router.post('/custom', auth, validate(customTextSchema), performCustomSentimentAnalysisHandler);
router.get('/score/:domain', auth, authorize('admin', 'content-manager'), validate(domainParamSchema, 'params'), getSentimentScoresHandler);
router.get('/:domain/history', auth, authorize('admin', 'content-manager'), validate(domainParamSchema, 'params'), getSentimentHistoryHandler);
router.get('/:domain/emotions', auth, authorize('admin', 'content-manager'), validate(domainParamSchema, 'params'), analyzeEmotionalSentimentHandler);
router.get('/:domain/sentiment-map', auth, authorize('admin', 'content-manager'), validate(domainParamSchema, 'params'), generateSentimentMapHandler);
router.post('/:domain/feedback', auth, validate(domainParamSchema, 'params'), validate(feedbackSchema), submitSentimentFeedbackHandler);
router.get('/:domain', auth, authorize('admin', 'content-manager'), validate(domainParamSchema, 'params'), getSentimentAnalysisHandler);

module.exports = router;
