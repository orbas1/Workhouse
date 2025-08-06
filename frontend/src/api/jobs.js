import apiClient from '../utils/apiClient.js';

export async function listPublicJobs() {
  const { data } = await apiClient.get('/jobs');
  return data;
}

export async function getPublicJob(jobId) {
  const { data } = await apiClient.get(`/jobs/${jobId}`);
  return data;
}
