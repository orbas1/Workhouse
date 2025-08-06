import apiFetch from '../utils/api.js';

export function applyToOpportunity(opportunityId, message = '') {
  return apiFetch('/applications', {
    method: 'POST',
    body: JSON.stringify({ opportunityId, message }),
  });
}

export function getUserApplications() {
  return apiFetch('/applications/user');
}
