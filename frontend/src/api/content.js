import apiClient from '../utils/apiClient.js';

export async function listContent(params = {}) {
  const { data } = await apiClient.get('/content', { params });
  return data;
}

export async function createContent(payload) {
  const { data } = await apiClient.post('/content/create', payload);
  return data;
}

export async function updateContent(id, payload) {
  const { data } = await apiClient.put(`/content/${id}`, payload);
  return data;
}

export async function deleteContent(id) {
  await apiClient.delete(`/content/${id}`);
  return true;
}
