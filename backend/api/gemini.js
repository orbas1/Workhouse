let genAI;

if (process.env.GEMINI_API_KEY) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

/**
 * Generate text from a prompt using Google's Gemini models.
 * @param {string} prompt
 * @param {string} model
 */
async function generateText(prompt, model = 'gemini-pro') {
  if (!genAI) return '';
  const gModel = genAI.getGenerativeModel({ model });
  const result = await gModel.generateContent(prompt);
  return result.response;
}

module.exports = {
  generateText,
};
