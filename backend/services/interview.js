const {
  createInterview,
  getInterviewById,
  listInterviewsForUser,
  listInterviewsForEmployer,
  updateInterviewStatus,
  addNoteToInterview,
} = require('../models/interview');

function scheduleInterview(data) {
  return createInterview(data);
}

function getInterview(id) {
  return getInterviewById(id);
}

function listUserInterviews(email) {
  return listInterviewsForUser(email);
}

function listEmployerInterviews(employerId) {
  return listInterviewsForEmployer(employerId);
}

function setInterviewStatus(id, status) {
  return updateInterviewStatus(id, status);
}

function addNote(id, text, authorId) {
  return addNoteToInterview(id, { text, authorId });
}

module.exports = {
  scheduleInterview,
  getInterview,
  listUserInterviews,
  listEmployerInterviews,
  setInterviewStatus,
  addNote,
};
