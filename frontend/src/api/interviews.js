import apiClient from '../utils/apiClient.js';

export async function getUserInterviews() {
  const { data } = await apiClient.get('/interviews/user');
  return data;
}

export async function getEmployerInterviews() {
  const { data } = await apiClient.get('/interviews/employer');
  return data;
}

