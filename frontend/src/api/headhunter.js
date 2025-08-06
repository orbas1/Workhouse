import apiClient from '../utils/apiClient.js';

export async function searchJobSeekers(query) {
  const { data } = await apiClient.get('/matching-engine/search', {
    params: { search: query }
  });
  return data;
}

export async function getRecommendations() {
  const { data } = await apiClient.get('/matching-engine/search');
  return data;
}

