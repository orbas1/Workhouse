const logger = require('../utils/logger');
const assessmentModel = require('../models/assessment');

async function submitAssessment(courseId, userId, responses) {
  const assessment = assessmentModel.addAssessment({ courseId, userId, responses });
  logger.info('Assessment submitted', { userId, courseId, assessmentId: assessment.id });
  return assessment;
}

async function issueCertificate(userId, { courseId, title, issuerId }) {
  const certificate = assessmentModel.addCertificate({ userId, courseId, title, issuerId });
  logger.info('Certificate issued', { userId, courseId, certificateId: certificate.id });
  return certificate;
}

async function getCertificatesByUser(userId) {
  return assessmentModel.listCertificates(userId);
}

async function autoGradeAssessment(courseId, userId) {
  const assessment = assessmentModel.getAssessment(courseId, userId);
  if (!assessment) {
    throw new Error('Assessment not found');
  }
  // Simple grading logic: score based on number of responses
  const score = Array.isArray(assessment.responses) ? assessment.responses.length * 10 : 0;
  assessmentModel.updateAssessmentScore(assessment.id, score);
  const feedbackMessage = `Auto-graded with score ${score}`;
  assessmentModel.addFeedback({ assessmentId: assessment.id, userId, courseId, message: feedbackMessage });
  logger.info('Assessment auto-graded', { userId, courseId, assessmentId: assessment.id, score });
  return { score };
}

async function getAssessmentFeedback(userId, courseId) {
  const feedback = assessmentModel.getFeedback(userId, courseId);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  return feedback;
}

module.exports = {
  submitAssessment,
  issueCertificate,
  getCertificatesByUser,
  autoGradeAssessment,
  getAssessmentFeedback,
};

