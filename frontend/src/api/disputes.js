import apiClient from '../utils/apiClient.js';

export function listDisputes(params = {}) {
  return apiClient.get('/admin/disputes', { params }).then(res => res.data);
}

export function getDispute(disputeId) {
  return apiClient.get(`/disputes/${disputeId}`).then(res => res.data);
}

export function createDispute(data) {
  return apiClient.post('/disputes/create', data).then(res => res.data);
}

export function respondToDispute(disputeId, data) {
  return apiClient.post(`/disputes/${disputeId}/respond`, data).then(res => res.data);
}

export function resolveDispute(disputeId, data = {}) {
  return apiClient.put(`/disputes/${disputeId}/resolve`, data).then(res => res.data);
}

export function postDisputeMessage(disputeId, message) {
  return apiClient.post(`/disputes/${disputeId}/messages`, { message }).then(res => res.data);
}
