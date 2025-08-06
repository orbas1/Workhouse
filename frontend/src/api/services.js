import apiClient from '../utils/apiClient.js';

export async function searchServices(params = {}) {
  const { data } = await apiClient.get('/marketplace/services', { params });
  return data;
}

export async function getService(id) {
  const { data } = await apiClient.get(`/marketplace/services/${id}`);
  return data;
}

export async function getServices({ sellerId } = {}) {
  const { data } = await apiClient.get('/service-providers/services', { params: { sellerId } });
  return data;
}

export async function createService(service) {
  const { data } = await apiClient.post('/service-providers/services', service);
  return data;
}

export async function updateService(id, updates) {
  const { data } = await apiClient.put(`/service-providers/services/${id}`, updates);
  return data;
}

export async function requestService(serviceId, description = '') {
  const { data } = await apiClient.post('/marketplace/services/request', { serviceId, description });
  return data;
}
