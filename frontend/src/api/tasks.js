import apiClient from '../utils/apiClient.js';

export function createTask(data) {
  return apiClient.post('/workspace/tasks/create', data).then(res => res.data);
}

export function listTasks(projectId) {
  return apiClient.get(`/workspace/projects/${projectId}/tasks`).then(res => res.data);
}

export function updateTask(taskId, updates) {
  return apiClient.put(`/workspace/tasks/update/${taskId}`, updates).then(res => res.data);
}

export function deleteTask(taskId) {
  return apiClient.delete(`/workspace/tasks/delete/${taskId}`);
}

export function assignTask(payload) {
  return apiClient.post('/workspace/tasks/assign', payload).then(res => res.data);
}
