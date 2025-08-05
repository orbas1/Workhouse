import apiClient from '../utils/apiClient.js';

export async function getUserProfile(userId) {
  const { data } = await apiClient.get(`/profiles/user/${userId}`);
  return data;
}
