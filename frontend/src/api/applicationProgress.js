import apiClient from '../utils/apiClient.js';

export async function updateApplicationProgress(agencyId, jobId, applicationId, payload) {
  const { data } = await apiClient.put(`/agency/${agencyId}/jobs/${jobId}/applications/${applicationId}/progress`, payload);
  return data;
}
