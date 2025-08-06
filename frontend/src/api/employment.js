import apiClient from '../utils/apiClient.js';

export async function getOverview() {
  const { data } = await apiClient.get('/analytics/employment/overview');
  return data;
}

export async function getJobs() {
  const { data } = await apiClient.get('/analytics/employment/jobs');
  return data;
}

export async function getJob(jobId) {
  const { data } = await apiClient.get(`/analytics/employment/jobs/${jobId}`);
  return data;
}

