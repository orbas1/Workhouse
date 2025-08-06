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
export async function listContent() {
  const { data } = await apiClient.get('/content');
  return data;
}

export async function updateContentStatus(id, status) {
  const { data } = await apiClient.patch(`/content/${id}/status`, { status });
  return data;
}

export async function deleteContent(id) {
  await apiClient.delete(`/content/${id}`);
  return true;
  const { data } = await apiClient.delete(`/content/${id}`);
  return data;
}
