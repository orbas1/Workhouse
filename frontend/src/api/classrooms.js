import apiClient from '../utils/apiClient.js';

export async function getMessages(classroomId) {
  const { data } = await apiClient.get(`/classroom/${classroomId}/messages`);
  return data.messages;
}

export async function sendMessage(classroomId, payload) {
  const { data } = await apiClient.post(`/classroom/${classroomId}/message`, payload);
  return data;
}
