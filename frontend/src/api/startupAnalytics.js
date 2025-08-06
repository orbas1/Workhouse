import apiClient from '../utils/apiClient.js';

export async function fetchStartupAnalytics() {
  const { data } = await apiClient.get('/startups/analytics');
  return data;
}
