import apiFetch from '../utils/api.js';

export function createDispute(data) {
  return apiFetch('/disputes/create', { method: 'POST', body: JSON.stringify(data) });
}

export function respondToDispute(disputeId, data) {
  return apiFetch(`/disputes/${disputeId}/respond`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getDispute(disputeId) {
  return apiFetch(`/disputes/${disputeId}`);
}

export function listDisputes(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/disputes${query ? `?${query}` : ''}`);
}

export function postDisputeMessage(disputeId, message) {
  return apiFetch(`/disputes/${disputeId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

window.disputesAPI = {
  createDispute,
  respondToDispute,
  getDispute,
  listDisputes,
  postDisputeMessage,
};
