const API_BASE_URL = window.API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}

export function fetchWorkspaceOverview() {
  return request('/analytics/workspace/overview');
}

export function fetchProjects() {
  return request('/workspace/projects');
}

export function fetchProjectTasks(projectId) {
  return request(`/workspace/projects/${projectId}/tasks`);
}

export function fetchProjectBudget(projectId) {
  return request(`/workspace/projects/${projectId}/budget`);
}

export function fetchProjectTeam(projectId) {
  return request(`/workspace/employment/list?projectId=${projectId}`);
}
