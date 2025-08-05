import apiClient from '../utils/apiClient.js';

export async function initiatePayment(amount, method) {
  const { data } = await apiClient.post('/payments/initiate', { amount, method });
  return data;
}

export async function getPaymentStatus(paymentId) {
  const { data } = await apiClient.get(`/payments/status/${paymentId}`);
  return data;
}
