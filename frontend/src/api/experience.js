import apiClient from '../utils/apiClient.js';

export async function fetchExperienceDashboard() {
  const { data } = await apiClient.get('/experience/dashboard');
  return data;
}
