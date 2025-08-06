import apiClient from '../utils/apiClient.js';

export async function fetchAffiliate(id) {
  const res = await apiClient.get(`/affiliates/${id}`);
  return res.data;
}

export async function fetchCommissionHistory(id) {
  const res = await apiClient.get(`/commissions/${id}/history`);
  return res.data;
}

export async function fetchCommissionRates() {
  const res = await apiClient.get('/commissions/rates');
  return res.data;
}

export async function initiatePayout(id, amount) {
  const res = await apiClient.post(`/payouts/initiate/${id}`, { amount });
  return res.data;
}

export async function fetchPayoutHistory(id) {
  const res = await apiClient.get(`/payouts/${id}/history`);
  return res.data;
}

export async function fetchReferrals(id) {
  const res = await apiClient.get(`/referrals/${id}`);
  return res.data;
}

export async function fetchLeaderboard() {
  const res = await apiClient.get('/commissions/leaderboard');
  return res.data;
}

export async function fetchCompetitions(id) {
  const res = await apiClient.get('/affiliates/competitions', { params: { affiliateId: id } });
  return res.data;
}

export async function fetchNotifications(id) {
  const res = await apiClient.get(`/affiliates/notifications/${id}`);
  return res.data;
}
