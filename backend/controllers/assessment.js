const {
  submitAssessment,
  issueCertificate,
  getCertificatesByUser,
  autoGradeAssessment,
  getAssessmentFeedback,
} = require('../services/assessment');
const logger = require('../utils/logger');

async function submitAssessmentHandler(req, res) {
  const { courseId } = req.params;
  const { userId, responses } = req.body;
  try {
    const assessment = await submitAssessment(courseId, userId, responses);
    res.status(201).json(assessment);
  } catch (err) {
    logger.error('Failed to submit assessment', { error: err.message, userId, courseId });
    res.status(400).json({ error: err.message });
  }
}

async function issueCertificateHandler(req, res) {
  const { userId } = req.params;
  const { courseId, title } = req.body;
  const issuerId = req.user?.username;
  try {
    const certificate = await issueCertificate(userId, { courseId, title, issuerId });
    res.status(201).json(certificate);
  } catch (err) {
    logger.error('Failed to issue certificate', { error: err.message, userId, courseId });
    res.status(400).json({ error: err.message });
  }
}

async function listCertificatesHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getCertificatesByUser(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to list certificates', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to list certificates' });
  }
}

async function autoGradeHandler(req, res) {
  const { courseId } = req.params;
  const { userId } = req.body;
  try {
    const result = await autoGradeAssessment(courseId, userId);
    res.json(result);
  } catch (err) {
    logger.error('Failed to auto-grade assessment', { error: err.message, userId, courseId });
    res.status(400).json({ error: err.message });
  }
}

async function getFeedbackHandler(req, res) {
  const { userId, courseId } = req.params;
  try {
    const feedback = await getAssessmentFeedback(userId, courseId);
    res.json(feedback);
  } catch (err) {
    logger.error('Failed to fetch assessment feedback', { error: err.message, userId, courseId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  submitAssessmentHandler,
  issueCertificateHandler,
  listCertificatesHandler,
  autoGradeHandler,
  getFeedbackHandler,
};

