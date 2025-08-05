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

export function fetchJobs(agencyId) {
  return request(`/${agencyId}/jobs`);
}

export function createJob(agencyId, data) {
  return request(`/${agencyId}/jobs/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateJob(agencyId, jobId, data) {
  return request(`/${agencyId}/jobs/update/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteJob(agencyId, jobId) {
  return request(`/${agencyId}/jobs/delete/${jobId}`, {
    method: 'DELETE',
  });
}
