import apiClient from '../utils/apiClient.js';

export async function getContracts() {
  const { data } = await apiClient.get('/contracts');
  return data;
}

export async function getContract(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}`);
  return data;
}

export async function createContract(contract) {
  const { data } = await apiClient.post('/contracts/create', contract);
  return data;
}

export async function updateContract(contractId, updates) {
  const { data } = await apiClient.put(`/contracts/${contractId}`, updates);
  return data;
}

export async function terminateContract(contractId, reason) {
  const { data } = await apiClient.put(`/contracts/${contractId}/terminate`, { reason });
  return data;
}

export async function fetchProposals(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}/proposals`);
  return data;
}

export async function fetchInvoices(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}/invoices`);
  return data;
}

export async function submitInvoice(contractId, invoice) {
  const { data } = await apiClient.post(`/contracts/${contractId}/invoices`, invoice);
  return data;
}
