import apiClient from '../utils/apiClient.js';

export async function login({ username, password }) {
  const { data } = await apiClient.post('/auth/login', { username, password });
  return data;
}

export async function fetchMe() {
  const { data } = await apiClient.get('/auth/me');
  return data;
}
