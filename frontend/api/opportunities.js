const API_BASE_URL = (window.env && window.env.API_BASE_URL) || '';

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

export function listOpportunities(params = {}) {
  const url = new URL(`${API_BASE_URL}/opportunities`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.append(key, value);
    }
  });
  return request(url.pathname + url.search);
}

export function getOpportunity(id) {
  return request(`/opportunities/${id}`);
}

window.opportunitiesAPI = { listOpportunities, getOpportunity };
