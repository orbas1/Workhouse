const { randomUUID } = require('crypto');

const clientFeedbacks = [];
const employeeFeedbacks = [];

function addClientFeedback({ agencyId, clientId, rating, comment }) {
  const record = {
    id: randomUUID(),
    agencyId,
    clientId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  clientFeedbacks.push(record);
  return record;
}

function addEmployeeFeedback({ agencyId, employeeId, rating, comment }) {
  const record = {
    id: randomUUID(),
    agencyId,
    employeeId,
    rating,
    comment: comment || null,
    createdAt: new Date(),
  };
  employeeFeedbacks.push(record);
  return record;
}

function getClientFeedbackByAgency(agencyId) {
  return clientFeedbacks.filter(f => f.agencyId === agencyId);
}

function getEmployeeFeedbackByAgency(agencyId) {
  return employeeFeedbacks.filter(f => f.agencyId === agencyId);
}

module.exports = {
  addClientFeedback,
  addEmployeeFeedback,
  getClientFeedbackByAgency,
  getEmployeeFeedbackByAgency,
};
