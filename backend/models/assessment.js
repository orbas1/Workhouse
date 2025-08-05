const { randomUUID } = require('crypto');

// In-memory stores simulating database tables
const assessments = [];
const certificates = [];
const feedbacks = [];

function addAssessment({ courseId, userId, responses }) {
  const record = {
    id: randomUUID(),
    courseId,
    userId,
    responses,
    score: null,
    graded: false,
    submittedAt: new Date(),
    gradedAt: null,
  };
  assessments.push(record);
  return record;
}

function getAssessment(courseId, userId) {
  return assessments.find((a) => a.courseId === courseId && a.userId === userId);
}

function updateAssessmentScore(id, score) {
  const assessment = assessments.find((a) => a.id === id);
  if (!assessment) return null;
  assessment.score = score;
  assessment.graded = true;
  assessment.gradedAt = new Date();
  return assessment;
}

function addFeedback({ assessmentId, userId, courseId, message }) {
  const record = {
    id: randomUUID(),
    assessmentId,
    userId,
    courseId,
    message,
    createdAt: new Date(),
  };
  feedbacks.push(record);
  return record;
}

function getFeedback(userId, courseId) {
  return feedbacks.find((f) => f.userId === userId && f.courseId === courseId);
}

function addCertificate({ userId, courseId, title, issuerId }) {
  const record = {
    id: randomUUID(),
    userId,
    courseId,
    title,
    issuerId,
    issuedAt: new Date(),
  };
  certificates.push(record);
  return record;
}

function listCertificates(userId) {
  return certificates.filter((c) => c.userId === userId);
}

module.exports = {
  addAssessment,
  getAssessment,
  updateAssessmentScore,
  addFeedback,
  getFeedback,
  addCertificate,
  listCertificates,
};

