const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json();
}

export function fetchEducationOverview() {
  return request('/education-analytics/courses/overview');
}

export function fetchUserEngagement(userId) {
  return request(`/education-analytics/user-engagement/${userId}`);
}

export function listCourses() {
  return request('/courses');
}

export function getCourse(id) {
  return request(`/courses/${id}`);
}

export function createCourse(data) {
  return request('/courses/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function addModule(courseId, data) {
  return request(`/courses/${courseId}/modules`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateModule(courseId, moduleId, data) {
  return request(`/courses/${courseId}/modules/${moduleId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteModule(courseId, moduleId) {
  return request(`/courses/${courseId}/modules/${moduleId}`, {
    method: 'DELETE',
  });
}

export function trackModuleProgress(data) {
  return request('/progress/track', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
