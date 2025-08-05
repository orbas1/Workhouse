import apiClient from '../utils/apiClient.js';

export async function getTasks(assignee) {
  const { data } = await apiClient.get('/workspace/tasks', { params: { assignee } });
  return data;
}
