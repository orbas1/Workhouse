import apiClient from '../utils/apiClient.js';


export async function listCourses() {
  const { data } = await apiClient.get('/courses');
  return data;
}

export async function createCourse(payload) {
  const { data } = await apiClient.post('/courses/create', payload);
  return data;
}

export async function getCourse(courseId) {
  const { data } = await apiClient.get(`/courses/${courseId}`);
  return data;
}

export async function addModule(courseId, payload) {
  const { data } = await apiClient.post(`/courses/${courseId}/modules`, payload);
  return data;
}

export async function deleteModule(courseId, moduleId) {
  await apiClient.delete(`/courses/${courseId}/modules/${moduleId}`);
}

export async function deleteCourse(courseId) {
  await apiClient.delete(`/courses/${courseId}`);
}

export async function updateCourse(courseId, payload) {
  const { data } = await apiClient.put(`/courses/update/${courseId}`, payload);
  return data;
}

export async function updateModule(courseId, moduleId, payload) {
  const { data } = await apiClient.put(`/courses/${courseId}/modules/${moduleId}`, payload);
  return data;
}
export function purchaseCourse(id, data) {
  return apiClient.post(`/courses/${id}/purchase`, data).then(res => res.data);
}
