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

export function searchJobSeekers(query) {
  return request(`/headhunter/search-job-seekers?query=${encodeURIComponent(query)}`);
}

export function getRecommendations() {
  return request('/headhunter/recommendations');
}

export default { searchJobSeekers, getRecommendations };

