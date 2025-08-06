const API_BASE_URL = window.API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}/disputes${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}

export function createDispute(data) {
  return request('/create', { method: 'POST', body: JSON.stringify(data) });
}

export function respondToDispute(disputeId, data) {
  return request(`/${disputeId}/respond`, { method: 'POST', body: JSON.stringify(data) });
}

export function getDispute(disputeId) {
  return request(`/${disputeId}`);
}

export function listDisputes({ role, userId } = {}) {
  const params = new URLSearchParams();
  if (userId) {
    if (role === 'disputee') params.set('disputeeId', userId);
    else params.set('userId', userId);
  }
  const query = params.toString();
  return request(query ? `?${query}` : '');
}
