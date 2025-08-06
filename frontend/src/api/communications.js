import apiClient from '../utils/apiClient.js';

export async function fetchConversations() {
  const { data } = await apiClient.get('/communications/messages/conversations');
  return data;
}

export async function fetchMessages(conversationId) {
  const { data } = await apiClient.get(`/communications/messages/conversation/${conversationId}`);
  return data;
}

export async function sendMessage(payload) {
  const { data } = await apiClient.post('/communications/messages', payload);
  return data;
}
