import apiClient from '../utils/apiClient.js';

export async function fetchSystemSettings() {
  const { data } = await apiClient.get('/admin/system-settings');
  return data;
}

export async function updateSystemSettings(payload) {
  const { data } = await apiClient.put('/admin/system-settings', payload);
  return data;
}

export async function listEmployees() {
  const { data } = await apiClient.get('/hr/employees');
  return data;
}

export async function createEmployee(payload) {
  const { data } = await apiClient.post('/hr/employees', payload);
  return data;
}

export async function updateEmployee(id, payload) {
  const { data } = await apiClient.put(`/hr/employees/${id}`, payload);
  return data;
}

export async function deleteEmployee(id) {
  await apiClient.delete(`/hr/employees/${id}`);
}

export default {
  fetchSystemSettings,
  updateSystemSettings,
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
