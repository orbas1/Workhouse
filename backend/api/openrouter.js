const axios = require('axios');

let client;

if (process.env.OPENROUTER_API_KEY) {
  client = axios.create({
    baseURL: 'https://openrouter.ai/api/v1',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
  });
}

/**
 * Send a chat completion request to OpenRouter.
 * @param {Array<Object>} messages Chat messages in OpenAI format
 * @param {string} model Model identifier
 */
async function generateChatCompletion(messages, model = 'openai/gpt-3.5-turbo') {
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

