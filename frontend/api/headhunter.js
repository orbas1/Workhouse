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

export function searchJobSeekers(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') qs.append(key, value);
  });
  return request(`/headhunter/search-job-seekers?${qs.toString()}`);
}

export function getRecommendations() {
  return request('/headhunter/recommendations');
}

export function fetchTasks() {
  return request('/headhunter/tasks');
}

export function updateTaskStatus(id, status) {
  return request(`/headhunter/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function fetchJobAllocations() {
  return request('/headhunter/job-allocations');
}

export function allocateJob(jobId, headhunterId) {
  return request('/headhunter/job-allocations', {
    method: 'POST',
    body: JSON.stringify({ jobId, headhunterId }),
  });
}

export function fetchHeadhunters() {
  return request('/headhunter/list');
}

export default {
  searchJobSeekers,
  getRecommendations,
  fetchTasks,
  updateTaskStatus,
  fetchJobAllocations,
  allocateJob,
  fetchHeadhunters,
};

