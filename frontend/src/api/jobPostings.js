import apiClient from '../utils/apiClient.js';

export async function fetchJobPostings() {
  const { data } = await apiClient.get('/hr/recruitment/job-postings');
  return data;
}

export async function submitJobApplication(payload) {
  const { data } = await apiClient.post('/hr/recruitment/applications', payload);
  return data;
}
