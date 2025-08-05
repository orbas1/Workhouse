import apiClient from '../utils/apiClient.js';

export async function getTasks(params = {}) {
  const { data } = await apiClient.get('/workspace/tasks', { params });
  return data;
}

export async function getTask(taskId) {
  const { data } = await apiClient.get(`/workspace/tasks/${taskId}`);
  return data;
}
