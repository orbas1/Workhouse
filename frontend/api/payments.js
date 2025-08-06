import apiFetch from '../utils/api.js';

export function fetchPayments(agencyId) {
  return apiFetch(`/agency/${agencyId}/payments`);
}
