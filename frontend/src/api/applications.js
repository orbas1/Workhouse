import apiClient from '../utils/apiClient.js';

export async function fetchUserApplications() {
  const { data } = await apiClient.get('/applications/user');
  return data;
}

export async function fetchOpportunityApplications(opportunityId) {
  const { data } = await apiClient.get(`/applications/opportunity/${opportunityId}`);
  return data;
}

export async function updateApplicationStatus(applicationId, status) {
  const { data } = await apiClient.put(`/applications/${applicationId}/status`, { status });
  return data;
}

export async function submitApplication(payload) {
  const { data } = await apiClient.post('/applications', payload);
  return data;
}
