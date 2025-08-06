import apiFetch from '../utils/api.js';

function fetchProposals(contractId) {
  return apiFetch(`/contracts/${contractId}/proposals`);
}

function fetchInvoices(contractId) {
  return apiFetch(`/contracts/${contractId}/invoices`);
}

function submitInvoice(contractId, data) {
  return apiFetch(`/contracts/${contractId}/invoices`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

window.contractsAPI = { fetchProposals, fetchInvoices, submitInvoice };
