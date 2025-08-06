import apiClient from '../utils/apiClient.js';

export async function listContent() {
  const { data } = await apiClient.get('/content');
  return data;
}

export async function updateContentStatus(id, status) {
  const { data } = await apiClient.patch(`/content/${id}/status`, { status });
  return data;
}

export async function deleteContent(id) {
  const { data } = await apiClient.delete(`/content/${id}`);
  return data;
}
