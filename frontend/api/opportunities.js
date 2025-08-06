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

export function fetchOpportunities(query = '') {
  const q = query ? `?${query}` : '';
  return request(q);
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
(function(global){
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';

  async function listOpportunities(params = {}){
    const token = localStorage.getItem('token');
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${baseUrl}/opportunities${query ? `?${query}` : ''}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if(!res.ok) throw new Error('Failed to fetch opportunities');
    return res.json();
  }

  async function getOpportunity(id){
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}/opportunities/${id}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if(!res.ok) throw new Error('Failed to fetch opportunity');
    return res.json();
  }

  global.opportunitiesAPI = { listOpportunities, getOpportunity };
})(window);
