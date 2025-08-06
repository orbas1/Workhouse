import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchTickets() {
  const res = await axios.get(`${API_BASE}/support/tickets`, { withCredentials: true });
  return res.data;
}

export async function createTicket(data) {
  const res = await axios.post(`${API_BASE}/support/tickets`, data, { withCredentials: true });
  return res.data;
}

export async function resolveTicket(id) {
  const res = await axios.put(`${API_BASE}/support/tickets/${id}/resolve`, {}, { withCredentials: true });
  return res.data;
}

export async function fetchDisputes() {
  const res = await axios.get(`${API_BASE}/support/disputes`, { withCredentials: true });
  return res.data;
}
