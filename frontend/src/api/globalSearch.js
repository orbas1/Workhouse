import apiClient from '../utils/apiClient.js';

export async function globalSearch(query = '') {
  const { data } = await apiClient.get('/search/global', { params: { q: query } });
  return data;
}
