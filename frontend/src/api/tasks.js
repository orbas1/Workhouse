import apiClient from '../utils/apiClient.js';

// Flexible task listing helper
// - listTasks(params)
// - listTasks(projectId, params)
export function listTasks(arg1, arg2) {
  if (typeof arg1 === 'object') {
    return apiClient
      .get('/workspace/tasks', { params: arg1 })
      .then((res) => res.data);
  }
  const projectId = arg1;
  const params = arg2 || {};
  const url = projectId
    ? `/workspace/projects/${projectId}/tasks`
    : '/workspace/tasks';
  return apiClient.get(url, { params }).then((res) => res.data);
}

export const getTasks = (params = {}) => listTasks(params);

export async function getTask(taskId) {
  const { data } = await apiClient.get(`/workspace/tasks/${taskId}`);
  return data;
}

export function listTasks(projectId, params = {}) {
  const url = projectId ? `/workspace/projects/${projectId}/tasks` : '/workspace/tasks';
  return apiClient.get(url, { params }).then((res) => res.data);
}

export function createTask(payload) {
  return apiClient.post('/workspace/tasks/create', payload).then((res) => res.data);
}

export function updateTask(taskId, updates) {
  return apiClient.put(`/workspace/tasks/update/${taskId}`, updates).then((res) => res.data);
}

export function deleteTask(taskId) {
  return apiClient.delete(`/workspace/tasks/delete/${taskId}`).then((res) => res.data);
}

export function assignTask(payload) {
  return apiClient.post('/workspace/tasks/assign', payload).then((res) => res.data);
}

export function createTask(data) {
  return apiClient
    .post('/workspace/tasks/create', data)
    .then((res) => res.data);
}

export function updateTask(taskId, updates) {
  return apiClient
    .put(`/workspace/tasks/update/${taskId}`, updates)
    .then((res) => res.data);
}

export function deleteTask(taskId) {
  return apiClient
    .delete(`/workspace/tasks/delete/${taskId}`)
    .then((res) => res.data);
}

export function assignTask(payload) {
  return apiClient
    .post('/workspace/tasks/assign', payload)
    .then((res) => res.data);
}
