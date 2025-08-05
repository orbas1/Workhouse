import apiClient from '../utils/apiClient.js';

export async function getUserProfile(userId) {
  const { data } = await apiClient.get(`/profiles/user/${userId}`);
  return data;
}

export async function updateUserProfile(userId, updates) {
  const { data } = await apiClient.put(`/profiles/user/update/${userId}`, updates);
  return data;
}
