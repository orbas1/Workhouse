import apiClient from '../utils/apiClient.js';

const endpoint = import.meta.env.VITE_COURSES_ENDPOINT || '/courses';

export function listCourses() {
  return apiClient.get(endpoint).then(res => res.data);
}

export function getCourse(id) {
  return apiClient.get(`${endpoint}/${id}`).then(res => res.data);
}

export function purchaseCourse(id, data) {
  return apiClient.post(`${endpoint}/${id}/purchase`, data).then(res => res.data);
}
