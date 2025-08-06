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

export function scheduleInterview(data) {
  return request('/interviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getUserInterviews() {
  return request('/interviews/user');
}

export function getEmployerInterviews() {
  return request('/interviews/employer');
}

export function updateInterviewStatus(id, status) {
  return request(`/interviews/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export function getInterview(id) {
  return request(`/interviews/${id}`);
}

export function addNote(id, text) {
  return request(`/interviews/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}
