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

window.apiFetch = apiFetch;
