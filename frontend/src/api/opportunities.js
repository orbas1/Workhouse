import apiClient from '../utils/apiClient.js';

export async function getOpportunityDashboard() {
  const res = await apiClient.get('/opportunities/dashboard');
  return res.data;
}

export async function createOpportunity(data) {
  const res = await apiClient.post('/opportunities', data);
  return res.data;
}

export async function updateOpportunity(id, data) {
  const res = await apiClient.put(`/opportunities/${id}`, data);
  return res.data;
}

export async function deleteOpportunity(id) {
  await apiClient.delete(`/opportunities/${id}`);
}

export async function duplicateOpportunity(id) {
  const op = await apiClient.get(`/opportunities/${id}`);
  const { id: _id, createdAt, updatedAt, views, applications, matches, deleted, ...data } = op.data;
  return createOpportunity(data);
}
