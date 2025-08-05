const axios = require('axios');

const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = process.env.HUGGINGFACE_API_KEY || '';

async function generateText(prompt) {
  const headers = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  const res = await axios.post(API_URL, { inputs: prompt }, { headers });
  const data = Array.isArray(res.data) ? res.data[0] : res.data;
  return data.generated_text || '';
}

module.exports = { generateText };
