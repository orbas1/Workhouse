import apiClient from '../utils/apiClient.js';

export async function login({ username, password, code }) {
  const res = await apiClient.post('/security/auth/login', { username, password, code });
  const { token } = res.data;
  localStorage.setItem('token', token);
  const meRes = await apiClient.get('/auth/me');
  const user = meRes.data;
  localStorage.setItem('userId', user.id);
  return user;
}

export async function register(data) {
  await apiClient.post('/security/auth/register', data);
}

export async function me() {
  const res = await apiClient.get('/auth/me');
  return res.data;
export async function login({ username, password }) {
  const { data } = await apiClient.post('/auth/login', { username, password });
  return data;
}

export async function fetchMe() {
  const { data } = await apiClient.get('/auth/me');
  return data;
}
