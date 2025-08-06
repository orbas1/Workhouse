import apiFetch from '../utils/api.js';

export function fetchJobs(agencyId) {
  return apiFetch(`/agency/${agencyId}/jobs`);
}

export function createJob(agencyId, data) {
  return apiFetch(`/agency/${agencyId}/jobs/create`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateJob(agencyId, jobId, data) {
  return apiFetch(`/agency/${agencyId}/jobs/update/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteJob(agencyId, jobId) {
  return apiFetch(`/agency/${agencyId}/jobs/delete/${jobId}`, {
    method: 'DELETE',
  });
}

(function(global){
  async function listJobs(){
    return apiFetch('/agency/jobs');
  }

  async function getJob(jobId){
    return apiFetch(`/agency/jobs/${jobId}`);
  }

  global.jobsAPI = { listJobs, getJob };
})(window);
