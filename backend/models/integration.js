const { randomUUID } = require('crypto');

// In-memory store for integration data by user
const userIntegrations = new Map();

function getUserRecord(userId) {
  if (!userIntegrations.has(userId)) {
    userIntegrations.set(userId, {
      lmsActivities: [],
      mentorshipFeedback: [],
      jobApplications: [],
      projects: [],
      certifications: [],
    });
  }
  return userIntegrations.get(userId);
}

function logLmsActivity(userId, { courseId, progress, description, completedAt }) {
  const record = {
    id: randomUUID(),
    courseId,
    progress,
    description: description || null,
    completedAt: completedAt ? new Date(completedAt) : null,
    loggedAt: new Date(),
  };
  getUserRecord(userId).lmsActivities.push(record);
  return record;
}

function logMentorshipFeedback(userId, { mentorId, feedback, rating, date }) {
  const record = {
    id: randomUUID(),
    mentorId,
    feedback,
    rating: rating || null,
    date: date ? new Date(date) : new Date(),
  };
  getUserRecord(userId).mentorshipFeedback.push(record);
  return record;
}

function logJobApplication(userId, { company, position, status, appliedAt }) {
  const record = {
    id: randomUUID(),
    company,
    position,
    status,
    appliedAt: appliedAt ? new Date(appliedAt) : new Date(),
  };
  getUserRecord(userId).jobApplications.push(record);
  return record;
}

function logProjectCompletion(userId, { projectId, title, completedAt }) {
  const record = {
    id: randomUUID(),
    projectId,
    title,
    completedAt: completedAt ? new Date(completedAt) : new Date(),
  };
  getUserRecord(userId).projects.push(record);
  return record;
}

function logCertification(userId, { name, institution, obtainedAt }) {
  const record = {
    id: randomUUID(),
    name,
    institution,
    obtainedAt: obtainedAt ? new Date(obtainedAt) : new Date(),
  };
  getUserRecord(userId).certifications.push(record);
  return record;
}

function getUserData(userId) {
  return getUserRecord(userId);
}

module.exports = {
  logLmsActivity,
  logMentorshipFeedback,
  logJobApplication,
  logProjectCompletion,
  logCertification,
  getUserData,
};
