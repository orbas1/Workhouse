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

export async function createOrder(payload) {
  const { data } = await apiClient.post('/service-providers/orders', payload);
export async function createOrder(order) {
  const { data } = await apiClient.post('/service-providers/orders', order);
  return data;
}

export async function deleteOrder(id) {
  const { data } = await apiClient.delete(`/service-providers/orders/${id}`);
  return data;
}
