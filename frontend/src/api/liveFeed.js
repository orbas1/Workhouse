import apiClient from '../utils/apiClient.js';

export async function getPosts(category) {
  const params = category ? { category } : {};
  const { data } = await apiClient.get('/live-feed/posts', { params });
  return data;
}

export async function createPost(payload) {
  const { data } = await apiClient.post('/live-feed/posts', payload);
  return data;
}

export async function getEvents() {
  const { data } = await apiClient.get('/live-feed/events');
  return data;
}

export async function likePost(postId) {
  const { data } = await apiClient.post(`/live-feed/posts/${postId}/like`);
  return data;
}
