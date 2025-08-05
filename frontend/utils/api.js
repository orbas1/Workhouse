function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers ? { ...options.headers } : {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
const API_BASE_URL = window.API_BASE_URL || '/api';

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(url, { ...options, headers });
function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch(url, { ...options, headers });
}

window.apiFetch = apiFetch;
const API_BASE_URL = window.API_BASE_URL || '/api';

async function apiFetch(path, options = {}) {
  const opts = { ...options };
  opts.headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const res = await fetch(`${API_BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

window.apiRequest = apiRequest;
window.apiFetch = apiFetch;
(function() {
  function getBaseUrl() {
    return window.env && window.env.API_BASE_URL ? window.env.API_BASE_URL : '';
  }

  async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token');
    const headers = Object.assign({}, options.headers || {});
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      headers,
    });
    return response;
  }

  window.apiFetch = apiFetch;
})();
