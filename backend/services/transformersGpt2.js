const logger = require('../utils/logger');
const {
  createInteraction,
  getInteractionById,
  listInteractionsByUser,
  deleteInteraction,
} = require('../models/transformersGpt2');

async function callApi(url, apiKey, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorText = await res.text();
    logger.error('External AI API error', { status: res.status, error: errorText });
    throw new Error('Failed to communicate with external AI');
  }
  return res.json();
}

async function generateText(userId, { prompt, maxTokens = 50 }) {
  const url = process.env.GPT2_API_URL;
  const apiKey = process.env.GPT2_API_KEY;
  if (!url || !apiKey) {
    return createInteraction({ userId, type: 'generation', prompt, response: '' });
  }
  const data = await callApi(url, apiKey, { prompt, max_tokens: maxTokens });
  const responseText = data.choices?.[0]?.text || '';
  return createInteraction({ userId, type: 'generation', prompt, response: responseText });
}

async function contactExternalAi(userId, { model, input }) {
  const url = process.env.AI_SERVICE_URL;
  const apiKey = process.env.AI_SERVICE_KEY;
  if (!url || !apiKey) {
    return createInteraction({ userId, type: 'contact', prompt: input, response: '' });
  }
  const data = await callApi(url, apiKey, { model, input });
  const responseText = data.result || data.response || '';
  return createInteraction({ userId, type: 'contact', prompt: input, response: responseText });
}

function fetchInteraction(id) {
  const interaction = getInteractionById(id);
  if (!interaction) throw new Error('Interaction not found');
  return interaction;
}

function fetchUserHistory(userId) {
  return listInteractionsByUser(userId);
}

function removeInteraction(id) {
  const success = deleteInteraction(id);
  if (!success) throw new Error('Interaction not found');
}

module.exports = {
  generateText,
  contactExternalAi,
  fetchInteraction,
  fetchUserHistory,
  removeInteraction,
};
