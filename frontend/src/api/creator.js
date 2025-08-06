import apiClient from '../utils/apiClient.js';

export async function getCreatorSeries() {
  const { data } = await apiClient.get('/podcast-analytics/creator/series');
  return data;
}

export async function getCreatorWebinars() {
  const { data } = await apiClient.get('/webinar-analytics/creator/webinars');
  return data;
}
