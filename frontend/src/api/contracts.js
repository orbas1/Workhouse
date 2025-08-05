import apiClient from '../utils/apiClient.js';

export async function getContracts() {
  const { data } = await apiClient.get('/contracts');
  return data;
}

export async function getContract(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}`);
  return data;
}

export async function terminateContract(contractId, reason) {
  const { data } = await apiClient.put(`/contracts/${contractId}/terminate`, { reason });
  return data;
}
