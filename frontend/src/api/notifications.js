import apiClient from '../utils/apiClient.js';

export function fetchNotifications() {
  return apiClient.get('/notifications').then(res => res.data.notifications);
}

export function fetchNotificationSettings() {
  return apiClient.get('/notifications/settings').then(res => res.data);
}

export function updateNotificationSettings(settings) {
  return apiClient.put('/notifications/settings', settings).then(res => res.data);
}
