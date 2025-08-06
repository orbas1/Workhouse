import apiClient from '../utils/apiClient.js';

const endpoint = import.meta.env.VITE_EDU_SCHEDULE_ENDPOINT || '/education/schedule';

export function listEvents() {
  return apiClient.get(endpoint).then(res => res.data);
}

export function createEvent(data) {
  return apiClient.post(endpoint, data).then(res => res.data);
}
