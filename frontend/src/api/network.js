import apiClient from '../utils/apiClient.js';

export async function searchProfiles(filters) {
  const { data } = await apiClient.get('/matching/search', { params: filters });
  return data.results;
}

export async function sendConnectionRequest(userId, message) {
  const { data } = await apiClient.post(`/matching/invite/${userId}`, { message });
  return data;
}

export default {
  searchProfiles,
  sendConnectionRequest,
};
