import apiClient from '../utils/apiClient.js';

export async function getSimDashboard() {
  const { data } = await apiClient.get('/sim/dashboard');
  return data;
}
