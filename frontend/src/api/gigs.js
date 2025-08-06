import apiClient from '../utils/apiClient.js';

export async function searchGigs(params = {}) {
  const { data } = await apiClient.get('/gigs/search', { params });
  return data;
}

export async function getMyGigs() {
  const { data } = await apiClient.get('/gigs/my-gigs');
  return data;
}

export async function getAppliedGigs() {
  const { data } = await apiClient.get('/gigs/applied');
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

export async function listGigs() {
  const { data } = await apiClient.get('/gigs');
  return data;
}

export async function createGig(payload) {
  const { data } = await apiClient.post('/gigs', payload);
  return data;
}

export async function updateGig(id, payload) {
  const { data } = await apiClient.put(`/gigs/${id}`, payload);
  return data;
}

export async function deleteGig(id) {
  const { data } = await apiClient.delete(`/gigs/${id}`);
  return data;
}

export async function getMyGigs() {
  const { data } = await apiClient.get('/gigs/my-gigs');
  return data;
}

export async function getAppliedGigs() {
  const { data } = await apiClient.get('/gigs/applied');
export async function listMyGigs(userId) {
  const { data } = await apiClient.get('/gigs', { params: { ownerId: userId } });
  return data;
}

export async function updateGig(gigId, updates) {
  const { data } = await apiClient.put(`/gigs/${gigId}`, updates);
  return data;
}

export async function toggleFavorite(gigId) {
  const { data } = await apiClient.post(`/gigs/${gigId}/favorite`);
  return data;
}

export async function getRecommendedGigs() {
  const { data } = await apiClient.get('/gigs/recommended');
  return data;
}
