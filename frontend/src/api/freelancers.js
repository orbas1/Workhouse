import apiClient from '../utils/apiClient.js';

export async function searchFreelancers(params = {}) {
  const { data } = await apiClient.get('/freelancers/search', { params });
  return data.freelancers;
}
