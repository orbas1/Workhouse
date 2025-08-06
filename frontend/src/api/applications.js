import apiClient from '../utils/apiClient.js';

export async function fetchUserApplications() {
  const { data } = await apiClient.get('/applications/user');
  return data;
}

export async function getUserApplications() {
  return fetchUserApplications();
}

export async function fetchOpportunityApplications(opportunityId) {
  const { data } = await apiClient.get(`/applications/opportunity/${opportunityId}`);
  return data;
}

export async function updateApplicationStatus(applicationId, status, certificateUrl) {
  const { data } = await apiClient.put(`/applications/${applicationId}/status`, {
    status,
    certificateUrl,
  });
  return data;
}

export async function submitApplication(payload) {
  const { data } = await apiClient.post('/applications', payload);
  return data;
}

export async function fetchCompletedApplications() {
  const { data } = await apiClient.get('/applications/completed');
  return data;
}

export async function deleteApplication(applicationId) {
  await apiClient.delete(`/applications/${applicationId}`);
}
