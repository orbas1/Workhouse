import apiClient from '../utils/apiClient.js';

const endpoint = import.meta.env.VITE_CALENDAR_ENDPOINT || '/service-providers/calendar';

export function fetchEvents(userId) {
  return apiClient.get(endpoint, { params: { userId } }).then((res) => res.data);
}

export function createEvent(data) {
  return apiClient.post(endpoint, data).then((res) => res.data);
}

export function updateEvent(id, updates) {
  return apiClient.put(`${endpoint}/${id}`, updates).then((res) => res.data);
}

export function deleteEvent(id) {
  return apiClient.delete(`${endpoint}/${id}`).then((res) => res.data);
}
