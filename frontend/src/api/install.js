import apiClient from '../utils/apiClient.js';

export async function getInstallStatus() {
  const { data } = await apiClient.get('/install/status');
  return data;
}

export async function runInstallation(payload) {
  const { data } = await apiClient.post('/install', payload);
  return data;
}
