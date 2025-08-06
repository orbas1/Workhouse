const { saveCv, getCv, saveCoverLetter, getCoverLetter } = require('../models/resume');
const { generateText } = require('../utils/aiClient');

const KEYWORDS = ['team', 'leadership', 'communication', 'project', 'experience', 'management'];

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/i, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyzeText(content) {
  const words = content.toLowerCase().match(/\b[^\s]+\b/g) || [];
  const wordCount = words.length;
  const sentences = content.match(/[.!?]+/g);
  const sentenceCount = sentences ? sentences.length : 1;
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const keywordMatches = KEYWORDS.filter(k => words.includes(k)).length;
  const keywordDensity = wordCount ? (keywordMatches / wordCount) * 100 : 0;
  const readability = wordCount ? 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount) : 0;

  const suggestions = [];
  if (keywordDensity < 2) {
    suggestions.push('Consider adding industry keywords like leadership or project management.');
  }
  if (readability < 60) {
    suggestions.push('Simplify sentences to improve readability.');
  }
  if (wordCount < 100) {
    suggestions.push('Expand on your experience with more detail.');
  }

  return {
    wordCount,
    keywordDensity: Number(keywordDensity.toFixed(2)),
    readability: Number(readability.toFixed(2)),
    suggestions,
  };
}

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

async function analyzeCvText(content) {
  return analyzeText(content);
}

module.exports = { storeCv, generateCv, storeCoverLetter, generateCoverLetter, getResume, analyzeCvText };
