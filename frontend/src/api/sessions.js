import apiClient from '../utils/apiClient.js';

export async function getUpcomingSessions(userId) {
  const { data } = await apiClient.get(`/sessions/upcoming/${userId}`);
  return data;
}

export async function cancelSession(sessionId) {
  const { data } = await apiClient.post(`/sessions/cancel/${sessionId}`);
  return data;
}

export async function rescheduleSession(sessionId, newTime) {
  const { data } = await apiClient.post(`/sessions/reschedule/${sessionId}`, { newTime });
  return data;
}

