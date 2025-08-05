const logger = require('../utils/logger');
const integrationModel = require('../models/integration');

async function reflectLmsActivity(userId, data) {
  const record = integrationModel.logLmsActivity(userId, data);
  logger.info('LMS activity logged', { userId, recordId: record.id });
  return record;
}

async function integrateMentorshipFeedback(userId, data) {
  const record = integrationModel.logMentorshipFeedback(userId, data);
  logger.info('Mentorship feedback logged', { userId, recordId: record.id });
  return record;
}

async function updateJobApplicationProgress(userId, data) {
  const record = integrationModel.logJobApplication(userId, data);
  logger.info('Job application progress updated', { userId, recordId: record.id });
  return record;
}

async function acknowledgeProjectCompletion(userId, data) {
  const record = integrationModel.logProjectCompletion(userId, data);
  logger.info('Project completion acknowledged', { userId, recordId: record.id });
  return record;
}

async function logCertification(userId, data) {
  const record = integrationModel.logCertification(userId, data);
  logger.info('Certification logged', { userId, recordId: record.id });
  return record;
}

async function generateCareerInsights(userId) {
  const data = integrationModel.getUserData(userId);
  const insights = [];

  if (data.certifications.length >= 3) {
    insights.push('You have earned multiple certifications. Consider pursuing leadership roles.');
  }
  if (data.projects.length >= 5) {
    insights.push('Strong project portfolio detected. Highlight these in your resume.');
  }
  if (data.jobApplications.some(j => j.status === 'offer')) {
    insights.push('Job offer received. Review terms carefully before accepting.');
  }
  if (data.mentorshipFeedback.length > 0) {
    insights.push('Leverage mentorship feedback to refine your career goals.');
  }
  if (!insights.length) {
    insights.push('Keep building your profile to receive tailored career insights.');
  }

  logger.info('Career insights generated', { userId, count: insights.length });
  return { userId, insights };
}

module.exports = {
  reflectLmsActivity,
  integrateMentorshipFeedback,
  updateJobApplicationProgress,
  acknowledgeProjectCompletion,
  logCertification,
  generateCareerInsights,
};
