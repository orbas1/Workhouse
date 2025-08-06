import apiFetch from '../utils/api.js';

export function fetchTimesheets(agencyId) {
  return apiFetch(`/agency/${agencyId}/timesheets`);
}

export function logTimesheet(agencyId, data) {
  return apiFetch(`/agency/${agencyId}/timesheets`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
