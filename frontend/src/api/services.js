import apiClient from '../utils/apiClient.js';

export async function getServices(sellerId) {
  const { data } = await apiClient.get('/service-providers/services', {
    params: { sellerId },
  });
  return data;
}

export async function updateService(id, updates) {
  const { data } = await apiClient.put(`/service-providers/services/${id}`, updates);
  return data;
}
