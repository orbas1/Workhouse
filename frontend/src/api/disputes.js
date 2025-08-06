import apiClient from '../utils/apiClient.js';

export async function listDisputes(params = {}) {
  const { data } = await apiClient.get('/disputes', { params });
  return data;
}

export async function getDispute(disputeId) {
  const { data } = await apiClient.get(`/disputes/${disputeId}`);
  return data;
}

export async function postDisputeMessage(disputeId, message) {
  const { data } = await apiClient.post(`/disputes/${disputeId}/messages`, { message });
  return data;
}

export async function createDispute(data) {
  const { data: dispute } = await apiClient.post('/disputes/create', data);
  return dispute;
}

export async function respondToDispute(disputeId, data) {
  const { data: dispute } = await apiClient.post(`/disputes/${disputeId}/respond`, data);
  return dispute;
}

export default {
  listDisputes,
  getDispute,
  postDisputeMessage,
  createDispute,
  respondToDispute,
};

