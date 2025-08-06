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
  if (res.status === 204) return {};
  return res.json();
}

export function applyToOpportunity(opportunityId, message = '') {
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify({ opportunityId, message }),
  });
}

export function getUserApplications() {
  return request('/applications/user');
}
