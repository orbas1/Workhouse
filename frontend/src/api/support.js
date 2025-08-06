import apiClient from '../utils/apiClient.js';

export function fetchTickets(params = {}) {
  return apiClient.get('/admin/support/tickets', { params }).then(res => res.data);
}

export function createTicket(data) {
  return apiClient.post('/support/tickets', data).then(res => res.data);
}

export function resolveTicket(ticketId, solution) {
  return apiClient.post('/admin/support/resolve', { ticketId, solution }).then(res => res.data);
}

export function fetchDisputes(params = {}) {
  return apiClient.get('/admin/disputes', { params }).then(res => res.data);
}
