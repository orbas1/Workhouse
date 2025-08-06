import apiFetch from '../utils/api.js';

export function listOpportunities(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/opportunities${query ? `?${query}` : ''}`);
}

export function getOpportunity(id) {
  return apiFetch(`/opportunities/${id}`);
}

export function fetchOpportunities(query = '') {
  const q = query ? `?${query}` : '';
  return apiFetch(`/opportunities${q}`);
}

export function createOpportunity(data) {
  return apiFetch('/opportunities', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateOpportunity(id, data) {
  return apiFetch(`/opportunities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteOpportunity(id) {
  return apiFetch(`/opportunities/${id}`, { method: 'DELETE' });
}

export function fetchOpportunityDashboard() {
  return apiFetch('/opportunities/dashboard');
}

export default {
  listOpportunities,
  getOpportunity,
  fetchOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  fetchOpportunityDashboard,
};

window.opportunitiesAPI = { listOpportunities, getOpportunity };
