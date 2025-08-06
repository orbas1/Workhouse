import apiClient from '../utils/apiClient.js';

export async function fetchAds() {
  const { data } = await apiClient.get('/ads');
  return data;
}

export async function getAdPreferences() {
  const { data } = await apiClient.get('/ads/preferences');
  return data;
}

export async function updateAdPreferences(preferences) {
  const { data } = await apiClient.post('/ads/preferences', { preferences });
  return data;
}
