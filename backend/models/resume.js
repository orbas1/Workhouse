const cvs = [];
const coverLetters = [];

function saveCv(record) {
  cvs.push(record);
}

function getCv(userId) {
  return cvs.find(c => c.userId === userId);
}

function saveCoverLetter(record) {
  coverLetters.push(record);
}

function getCoverLetter(userId) {
  return coverLetters.find(c => c.userId === userId);
}

module.exports = { saveCv, getCv, saveCoverLetter, getCoverLetter };
