import apiClient from '../utils/apiClient.js';

export async function fetchAnalytics() {
  const { data } = await apiClient.get('/ads/analytics');
  return data;
}

export async function createAd(groupId, ad) {
  const { data } = await apiClient.post(`/ads/groups/${groupId}/ads`, ad);
  return data;
}

export async function getAd(groupId, adId) {
  const { data } = await apiClient.get(`/ads/groups/${groupId}/ads/${adId}`);
  return data;
}

export async function updateAd(groupId, adId, ad) {
  const { data } = await apiClient.put(`/ads/groups/${groupId}/ads/${adId}`, ad);
  return data;
}

