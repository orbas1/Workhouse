import apiClient from '../utils/apiClient.js';

const endpoint = '/workspace/calendar/events';

export function fetchEvents(projectId) {
  return apiClient
    .get(`/workspace/calendar/project/${projectId}`)
    .then((res) => res.data);
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
