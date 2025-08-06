import apiFetch from '../utils/api.js';

export function searchJobSeekers(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') qs.append(key, value);
  });
  return apiFetch(`/headhunter/search-job-seekers?${qs.toString()}`);
}

export function getRecommendations() {
  return apiFetch('/headhunter/recommendations');
}

export function fetchTasks() {
  return apiFetch('/headhunter/tasks');
}

export function updateTaskStatus(id, status) {
  return apiFetch(`/headhunter/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function fetchJobAllocations() {
  return apiFetch('/headhunter/job-allocations');
}

export function allocateJob(jobId, headhunterId) {
  return apiFetch('/headhunter/job-allocations', {
    method: 'POST',
    body: JSON.stringify({ jobId, headhunterId }),
  });
}

export function fetchHeadhunters() {
  return apiFetch('/headhunter/list');
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

