import apiFetch from '../utils/api.js';

export function fetchWorkspaceOverview() {
  return apiFetch('/analytics/workspace/overview');
}

export function fetchProjects() {
  return apiFetch('/workspace/projects');
}

export function fetchProjectTasks(projectId) {
  return apiFetch(`/workspace/projects/${projectId}/tasks`);
}

export function fetchProjectBudget(projectId) {
  return apiFetch(`/workspace/projects/${projectId}/budget`);
}

export function fetchProjectTeam(projectId) {
  return apiFetch(`/workspace/employment/list?projectId=${projectId}`);
}
