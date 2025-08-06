import apiClient from '../utils/apiClient.js';

export async function fetchNetworkingEvents() {
  const { data } = await apiClient.get('/events/networking');
  return data;
}

export async function attendNetworkingEvent(eventId) {
  const { data } = await apiClient.post(`/events/networking/attend/${eventId}`);
  return data;
}

export default {
  fetchNetworkingEvents,
  attendNetworkingEvent,
};

