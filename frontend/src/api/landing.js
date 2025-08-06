import apiClient from '../utils/apiClient.js';

export async function getLandingContent() {
  const { data } = await apiClient.get('/landing/content');
  return data;
}
