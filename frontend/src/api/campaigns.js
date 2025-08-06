import apiClient from '../utils/apiClient.js';

export async function fetchCampaigns() {
  const { data } = await apiClient.get('/campaigns');
  return data;
}

export async function createCampaign(campaign) {
  const { data } = await apiClient.post('/campaigns', campaign);
  return data;
}

export async function updateCampaign(id, updates) {
  const { data } = await apiClient.put(`/campaigns/${id}`, updates);
  return data;
}
