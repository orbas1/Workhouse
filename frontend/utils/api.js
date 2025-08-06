export const API_BASE_URL =
  window.env?.API_BASE_URL || window.API_BASE_URL || '/api';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

window.apiFetch = apiFetch;
export default apiFetch;
