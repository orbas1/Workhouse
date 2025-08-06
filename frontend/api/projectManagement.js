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

export function fetchProjects() {
  return request('/workspace/projects');
}

export function createProject(data) {
  return request('/workspace/projects/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateProject(projectId, data) {
  return request(`/workspace/projects/update/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteProject(projectId) {
  return request(`/workspace/projects/delete/${projectId}`, {
    method: 'DELETE',
  });
}

(function (global) {
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';
  async function listProjects() {
    const res = await fetch(`${baseUrl}/workspace/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  }
  global.projectManagementAPI = { listProjects };
})(window);
