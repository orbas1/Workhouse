import apiClient from '../utils/apiClient.js';

export async function listDisputes({ role, userId } = {}) {
  const params = {};
  if (userId) {
    if (role === 'disputee') params.disputeeId = userId;
    else params.userId = userId;
  }
  const { data } = await apiClient.get('/disputes', { params });
  return data;
}

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

export function createDispute(data) {
  return apiClient.post('/disputes/create', data).then(res => res.data);
}

export async function getDispute(disputeId) {
  const { data: dispute } = await apiClient.get(`/disputes/${disputeId}`);
  return dispute;
}

export async function postDisputeMessage(disputeId, message) {
  const { data } = await apiClient.post(`/disputes/${disputeId}/messages`, { message });
  return data;
export default {
  listDisputes,
  getDispute,
  postDisputeMessage,
  createDispute,
  respondToDispute,
};

export function respondToDispute(disputeId, data) {
  return apiClient.post(`/disputes/${disputeId}/respond`, data).then(res => res.data);
}

export function resolveDispute(disputeId, data = {}) {
  return apiClient.put(`/disputes/${disputeId}/resolve`, data).then(res => res.data);
}

export function postDisputeMessage(disputeId, message) {
  return apiClient.post(`/disputes/${disputeId}/messages`, { message }).then(res => res.data);
}
