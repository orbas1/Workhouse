const { saveCv, getCv, saveCoverLetter, getCoverLetter } = require('../models/resume');
const { generateText } = require('../utils/aiClient');

async function storeCv(userId, file) {
  const record = {
    userId,
    filename: file.originalname,
    path: file.path,
    uploadedAt: new Date().toISOString()
  };
  saveCv(record);
  return record;
}

async function generateCv(userId, prompt) {
  const content = await generateText(prompt);
  const record = { userId, content, generatedAt: new Date().toISOString() };
  saveCv(record);
  return content;
}

async function storeCoverLetter(userId, file) {
  const record = {
    userId,
    filename: file.originalname,
    path: file.path,
    uploadedAt: new Date().toISOString()
  };
  saveCoverLetter(record);
  return record;
}

async function generateCoverLetter(userId, prompt) {
  const content = await generateText(prompt);
  const record = { userId, content, generatedAt: new Date().toISOString() };
  saveCoverLetter(record);
  return content;
}

async function getResume(userId) {
  return { cv: getCv(userId), coverLetter: getCoverLetter(userId) };
}

module.exports = { storeCv, generateCv, storeCoverLetter, generateCoverLetter, getResume };
