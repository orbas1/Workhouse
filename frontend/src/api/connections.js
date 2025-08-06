import apiClient from '../utils/apiClient.js';

export async function getConnections(userId) {
  const { data } = await apiClient.get(`/connections/user/${userId}`);
  return data;
}

export async function addConnection(userId, connection) {
  const { data } = await apiClient.post(`/connections/user/${userId}`, connection);
  return data;
}

export async function updateConnection(id, updates) {
  const { data } = await apiClient.put(`/connections/${id}`, updates);
  return data;
}

