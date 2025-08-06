const API_BASE_URL = window.API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}/contracts${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}

function fetchProposals(contractId) {
  return request(`/${contractId}/proposals`);
}

function fetchInvoices(contractId) {
  return request(`/${contractId}/invoices`);
}

function submitInvoice(contractId, data) {
  return request(`/${contractId}/invoices`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

window.contractsAPI = { fetchProposals, fetchInvoices, submitInvoice };
