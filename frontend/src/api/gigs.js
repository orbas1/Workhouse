import apiClient from '../utils/apiClient.js';

export async function searchGigs(params = {}) {
  const { data } = await apiClient.get('/gigs/search', { params });
  return data;
}

export async function getGig(id) {
  const { data } = await apiClient.get(`/gigs/${id}`);
  return data;
}

export async function createGigOrder(gigId, details = {}) {
  const { data } = await apiClient.post(`/gigs/${gigId}/order`, details);
  return data;
}
