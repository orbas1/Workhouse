import apiClient from '../utils/apiClient.js';

// Fetch job postings with optional query parameters for search and filtering
export async function fetchJobPostings(params = {}) {
  const { data } = await apiClient.get('/hr/recruitment/job-postings', { params });
  return data;
}

// Submit an application for a specific job posting
export async function submitJobApplication(payload) {
  const { data } = await apiClient.post('/hr/recruitment/applications', payload);
  return data;
}

