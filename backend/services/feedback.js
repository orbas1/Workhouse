const feedbackModel = require('../models/feedback');
const logger = require('../utils/logger');

async function submitClientFeedback(data) {
  const record = feedbackModel.addClientFeedback(data);
  logger.info('Client feedback submitted', { agencyId: data.agencyId, clientId: data.clientId });
  return record;
}

async function submitEmployeeFeedback(data) {
  const record = feedbackModel.addEmployeeFeedback(data);
  logger.info('Employee feedback submitted', { agencyId: data.agencyId, employeeId: data.employeeId });
  return record;
}

async function getQualityScores(agencyId) {
  const clientFeedbacks = feedbackModel.getClientFeedbackByAgency(agencyId);
  const employeeFeedbacks = feedbackModel.getEmployeeFeedbackByAgency(agencyId);

  const average = arr => (arr.length ? arr.reduce((sum, f) => sum + f.rating, 0) / arr.length : 0);
  const clientAvg = average(clientFeedbacks);
  const employeeAvg = average(employeeFeedbacks);
  const totalCount = clientFeedbacks.length + employeeFeedbacks.length;
  const overallRating = totalCount
    ? ((clientAvg * clientFeedbacks.length) + (employeeAvg * employeeFeedbacks.length)) / totalCount
    : 0;

  logger.info('Quality scores retrieved', { agencyId });
  return {
    agencyId,
    clientFeedback: {
      count: clientFeedbacks.length,
      averageRating: clientAvg,
    },
    employeeFeedback: {
      count: employeeFeedbacks.length,
      averageRating: employeeAvg,
    },
    overallRating,
  };
}

module.exports = {
  submitClientFeedback,
  submitEmployeeFeedback,
  getQualityScores,
};
