import apiClient from '../utils/apiClient.js';

export async function getInstallStatus() {
  const { data } = await apiClient.get('/install/status');
  return data;
}

export async function runInstallation(payload) {
  const { data } = await apiClient.post('/install', payload);
  return data;
}

export async function checkDatabaseConnection(dbConfig) {
  const { data } = await apiClient.post('/install/check-db', { dbConfig });
  return data;
}

export async function checkPermissions() {
  const { data } = await apiClient.get('/install/permissions');
  return data;
}
