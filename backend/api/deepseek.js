const axios = require('axios');

let client;

if (process.env.DEEPSEEK_API_KEY) {
  client = axios.create({
    baseURL: 'https://api.deepseek.com',
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
  });
}

/**
 * Generate a chat completion using DeepSeek's API.
 * @param {Array<Object>} messages Chat messages in OpenAI format
 * @param {string} model Model identifier
 */
async function generateChatCompletion(messages, model = 'deepseek-chat') {
  if (!client) return { choices: [] };
  const response = await client.post('/chat/completions', {
    model,
    messages,
  });
  return response.data;
}

module.exports = {
  generateChatCompletion,
};
