import apiClient from '../utils/apiClient.js';

export async function fetchJobs(agencyId) {
  const { data } = await apiClient.get(`/agency/${agencyId}/jobs`);
  return data;
}

export async function createJob(agencyId, payload) {
  const { data } = await apiClient.post(`/agency/${agencyId}/jobs/create`, payload);
  return data;
}

export async function updateJob(agencyId, jobId, payload) {
  const { data } = await apiClient.put(`/agency/${agencyId}/jobs/update/${jobId}`, payload);
  return data;
}

export async function deleteJob(agencyId, jobId) {
  const { data } = await apiClient.delete(`/agency/${agencyId}/jobs/delete/${jobId}`);
  return data;
}
