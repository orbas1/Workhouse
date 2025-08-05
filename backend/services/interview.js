const {
  createInterview,
  getInterviewById,
  addNoteToInterview,
} = require('../models/interview');

function scheduleInterview(data) {
  return createInterview(data);
}

function getInterview(id) {
  return getInterviewById(id);
}

function addNote(id, text) {
  return addNoteToInterview(id, text);
}

module.exports = {
  scheduleInterview,
  getInterview,
  addNote,
};
