import apiClient from '../utils/apiClient.js';

export async function saveFinancialMedia(userId, payload) {
  const { data } = await apiClient.post(`/user-setup/${userId}/financial-media`, payload);
  return data;
}

export async function getFinancialMedia(userId) {
  const { data } = await apiClient.get(`/user-setup/${userId}/financial-media`);
  return data;
}
