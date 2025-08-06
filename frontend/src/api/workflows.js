import apiClient from '../utils/apiClient.js';

export function setupWorkflow(data) {
  return apiClient.post('/workspace/workflows/setup', data).then(res => res.data);
}

export function listWorkflows(projectId) {
  return apiClient.get(`/workspace/projects/${projectId}/workflows`).then(res => res.data);
}
