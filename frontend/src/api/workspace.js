import apiClient from '../utils/apiClient.js';

export function fetchWorkspaceOverview() {
  return apiClient.get('/analytics/workspace/overview').then((res) => res.data);
}

export function fetchProjects() {
  return apiClient.get('/workspace/projects').then((res) => res.data);
}

export function fetchProjectTasks(projectId) {
  return apiClient
    .get(`/workspace/projects/${projectId}/tasks`)
    .then((res) => res.data);
}

export function fetchProjectBudget(projectId) {
  return apiClient
    .get(`/workspace/projects/${projectId}/budget`)
    .then((res) => res.data);
}

export function fetchProjectTeam(projectId) {
  return apiClient
    .get('/workspace/employment/list', { params: { projectId } })
    .then((res) => res.data);
}
