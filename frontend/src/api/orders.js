import apiClient from '../utils/apiClient.js';

export async function getOrders(userId) {
  const { data } = await apiClient.get('/service-providers/orders', { params: { userId } });
  return data;
}

export async function getOrder(id) {
  const { data } = await apiClient.get(`/service-providers/orders/${id}`);
  return data;
}

export async function updateOrder(id, updates) {
  const { data } = await apiClient.put(`/service-providers/orders/${id}`, updates);
  return data;
}
