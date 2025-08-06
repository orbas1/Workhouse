const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const ANALYTICS_ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT || '/analytics/content/performance';
const AUDIT_ENDPOINT = import.meta.env.VITE_AUDIT_RESULTS_ENDPOINT || '/admin/audit-logs';

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

export function fetchContentPerformance() {
  return request(ANALYTICS_ENDPOINT);
}

export function fetchAuditLogs() {
  return request(AUDIT_ENDPOINT);
}
