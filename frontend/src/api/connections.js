import apiClient from '../utils/apiClient.js';

export async function getConnections() {
  const { data } = await apiClient.get('/connections');
  return data;
}

export async function addConnection(connection) {
  const { data } = await apiClient.post('/connections', connection);
  return data;
}

export async function updateConnection(id, updates) {
  const { data } = await apiClient.put(`/connections/${id}`, updates);
  return data;
}

