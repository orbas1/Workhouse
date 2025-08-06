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

export async function getProposals(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}/proposals`);
  return data;
}

export async function getInvoices(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}/invoices`);
  return data;
}

export async function submitInvoice(contractId, invoice) {
  const { data } = await apiClient.post(`/contracts/${contractId}/invoices`, invoice);
  return data;
}

export async function getWorkSubmissions(contractId) {
  const { data } = await apiClient.get(`/contracts/${contractId}/work`);
  return data;
}

export async function submitWork(contractId, submission) {
  const { data } = await apiClient.post(`/contracts/${contractId}/work/submit`, submission);
  return data;
}

export async function approveWork(contractId, submissionId) {
  const { data } = await apiClient.put(`/contracts/${contractId}/work/approve`, { submissionId });
  return data;
}
