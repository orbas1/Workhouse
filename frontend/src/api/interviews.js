import apiClient from '../utils/apiClient.js';

export async function getUserInterviews() {
  const { data } = await apiClient.get('/interviews/user');
  return data;
}

export async function getEmployerInterviews() {
  const { data } = await apiClient.get('/interviews/employer');
  return data;
}

export async function scheduleInterview(payload) {
  const { data } = await apiClient.post('/interviews', payload);
  return data;
}

export async function updateInterviewStatus(interviewId, status) {
  const { data } = await apiClient.put(`/interviews/${interviewId}/status`, { status });
  return data;
}

export async function getInterview(interviewId) {
  const { data } = await apiClient.get(`/interviews/${interviewId}`);
  return data;
}

export async function addNote(interviewId, text) {
  const { data } = await apiClient.post(`/interviews/${interviewId}/notes`, { text });
  return data;
}

