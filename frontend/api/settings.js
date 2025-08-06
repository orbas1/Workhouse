import apiFetch from '../utils/api.js';

export function fetchSettings() {
  return apiFetch('/settings');
}

export function updateSettings(data) {
  return apiFetch('/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
