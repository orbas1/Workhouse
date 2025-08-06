import apiClient from '../utils/apiClient.js';

export async function getDispute(disputeId) {
  const { data } = await apiClient.get(`/disputes/${disputeId}`);
  return data;
}

export async function postDisputeMessage(disputeId, message) {
  const { data } = await apiClient.post(`/disputes/${disputeId}/messages`, { message });
  return data;
}
