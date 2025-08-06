import apiFetch from '../utils/api.js';

export async function fetchSystemSettings() {
  return apiFetch('/admin/system-settings');
}

export async function updateSystemSettings(data) {
  return apiFetch('/admin/system-settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function listEmployees() {
  return apiFetch('/hr/employees');
}

export async function createEmployee(data) {
  return apiFetch('/hr/employees', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(id, data) {
  return apiFetch(`/hr/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteEmployee(id) {
  return apiFetch(`/hr/employees/${id}`, { method: 'DELETE' });
}

export default {
  fetchSystemSettings,
  updateSystemSettings,
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
