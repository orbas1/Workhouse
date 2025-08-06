import apiClient from '../utils/apiClient.js';

export async function fetchStatsOverview() {
  const { data } = await apiClient.get('/stats/overview');
  return data;
}
