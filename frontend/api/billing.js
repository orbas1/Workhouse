import apiFetch, { API_BASE_URL } from '../utils/api.js';

export function fetchSubscription() {
  return apiFetch('/billing/subscription');
}

export function updateSubscription(data) {
  return apiFetch('/billing/subscription', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function fetchPaymentMethods() {
  return apiFetch('/billing/payment-methods');
}

export function addPaymentMethod(data) {
  return apiFetch('/billing/payment-methods', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function removePaymentMethod(id) {
  return apiFetch(`/billing/payment-methods/${id}`, { method: 'DELETE' });
}

export function fetchTransactions() {
  return apiFetch('/billing/transactions');
}

export async function downloadInvoice(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}/billing/transactions/${id}/invoice`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to download invoice');
  return res.blob();
}
