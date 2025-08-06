import apiClient from '../utils/apiClient.js';

export async function createDispute(data) {
  const { data: dispute } = await apiClient.post('/disputes/create', data);
  return dispute;
}

export async function respondToDispute(disputeId, data) {
  const { data: dispute } = await apiClient.post(`/disputes/${disputeId}/respond`, data);
  return dispute;
}

export async function getDispute(disputeId) {
  const { data: dispute } = await apiClient.get(`/disputes/${disputeId}`);
  return dispute;
export function listDisputes(params = {}) {
  return apiClient.get('/disputes', { params }).then(res => res.data);
}
