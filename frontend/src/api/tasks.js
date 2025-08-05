import apiClient from '../utils/apiClient.js';

export async function listTasks(params = {}) {
  const { data } = await apiClient.get('/workspace/tasks', { params });
  return data;
}
