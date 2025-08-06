import apiFetch from '../utils/api.js';

export function scheduleInterview(data) {
  return apiFetch('/interviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getUserInterviews() {
  return apiFetch('/interviews/user');
}

export function getEmployerInterviews() {
  return apiFetch('/interviews/employer');
}

export function updateInterviewStatus(id, status) {
  return apiFetch(`/interviews/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export function getInterview(id) {
  return apiFetch(`/interviews/${id}`);
}

export function addNote(id, text) {
  return apiFetch(`/interviews/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}
