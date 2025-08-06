const API_BASE_URL = window.API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}/opportunities${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  if (res.status === 204) return {};
  return res.json();
}

export function listOpportunities(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(query ? `?${query}` : '');
}

export function getOpportunity(id) {
  return request(`/${id}`);
}

export function createOpportunity(data) {
  return request('', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateOpportunity(id, data) {
  return request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteOpportunity(id) {
  return request(`/${id}`, { method: 'DELETE' });
}

export function fetchOpportunityDashboard() {
  return request('/dashboard');
}

window.opportunitiesAPI = { listOpportunities, getOpportunity };
