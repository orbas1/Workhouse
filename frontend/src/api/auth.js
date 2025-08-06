import apiClient from '../utils/apiClient.js';

export async function login({ username, password }) {
  const { data } = await apiClient.post('/auth/login', { username, password });
  const { token } = data;
  localStorage.setItem('token', token);
  const meRes = await apiClient.get('/auth/me');
  return meRes.data;
}

export async function register(payload) {
  await apiClient.post('/auth/register', payload);
}

export async function me() {
  const { data } = await apiClient.get('/auth/me');
  return data;
}
