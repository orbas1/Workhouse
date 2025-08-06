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

export function fetchSubscription() {
  return request('/billing/subscription');
}

export function updateSubscription(data) {
  return request('/billing/subscription', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function fetchPaymentMethods() {
  return request('/billing/payment-methods');
}

export function addPaymentMethod(data) {
  return request('/billing/payment-methods', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function removePaymentMethod(id) {
  return request(`/billing/payment-methods/${id}`, { method: 'DELETE' });
}

export function fetchTransactions() {
  return request('/billing/transactions');
}

export async function downloadInvoice(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/billing/transactions/${id}/invoice`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to download invoice');
  return res.blob();
}
