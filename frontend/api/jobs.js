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
  return request(`/agency/${agencyId}/jobs`);
}

export function createJob(agencyId, data) {
  return request(`/agency/${agencyId}/jobs/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateJob(agencyId, jobId, data) {
  return request(`/agency/${agencyId}/jobs/update/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteJob(agencyId, jobId) {
  return request(`/agency/${agencyId}/jobs/delete/${jobId}`, {
    method: 'DELETE',
  });
}
(function(global){
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';

  async function listJobs(){
    const res = await fetch(`${baseUrl}/agency/jobs`);
    if(!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  }

  async function getJob(jobId){
    const res = await fetch(`${baseUrl}/agency/jobs/${jobId}`);
    if(!res.ok) throw new Error('Failed to fetch job');
    return res.json();
  }

  global.jobsAPI = { listJobs, getJob };
})(window);
