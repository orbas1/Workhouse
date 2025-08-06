import apiClient from '../utils/apiClient.js';

export async function login(username, password, code, remember = true) {
  const { data } = await apiClient.post('/auth/login', { username, password, code });
  const { token } = data;
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem('token', token);
  const meRes = await apiClient.get('/auth/me');
  return meRes.data;
}

export async function register(payload) {
  await apiClient.post('/auth/register', payload);
}

export async function resetPassword(username, password) {
  await apiClient.post('/auth/reset-password', { username, password });
}

export async function me() {
  const { data } = await apiClient.get('/auth/me');
  return data;
}

export function loginWithProvider(provider) {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${provider}`;
}
