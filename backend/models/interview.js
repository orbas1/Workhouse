const interviews = [];
let idCounter = 1;

function createInterview({ interviewerId, candidateId, scheduledFor }) {
  const interview = {
    id: idCounter++,
    interviewerId: Number(interviewerId),
    candidateId: Number(candidateId),
    scheduledFor: new Date(scheduledFor),
    notes: [],
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  interviews.push(interview);
  return interview;
}

function getInterviewById(id) {
  return interviews.find(i => i.id === Number(id));
}

function addNoteToInterview(id, text) {
  const interview = getInterviewById(id);
  if (!interview) return null;
  interview.notes.push({ text, createdAt: new Date() });
  interview.updatedAt = new Date();
  return interview;
}

module.exports = {
  interviews,
  createInterview,
  getInterviewById,
  addNoteToInterview,
};
