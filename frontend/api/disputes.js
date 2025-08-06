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

function createDispute(data) {
  return request('/create', { method: 'POST', body: JSON.stringify(data) });
}

function respondToDispute(disputeId, data) {
  return request(`/${disputeId}/respond`, { method: 'POST', body: JSON.stringify(data) });
}

function getDispute(disputeId) {
  return request(`/${disputeId}`);
}

function listDisputes(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(query ? `?${query}` : '');
}

function postDisputeMessage(disputeId, message) {
  return request(`/${disputeId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

window.disputesAPI = {
  createDispute,
  respondToDispute,
  getDispute,
  listDisputes,
  postDisputeMessage,
};
