const API_BASE_URL =
  (typeof window !== 'undefined' && window.API_BASE_URL) ||
  import.meta.env.VITE_API_BASE_URL ||
  '/api';

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

export function fetchNetworkingEvents() {
  return request('/events/networking');
}

export function attendNetworkingEvent(eventId) {
  return request(`/events/networking/attend/${eventId}`, { method: 'POST' });
}

export function startVideo(sessionId, data = {}) {
  return request(`/communicationTools/video/start/${sessionId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function endVideo(sessionId) {
  return request(`/communicationTools/video/end/${sessionId}`, { method: 'POST' });
}

export function exchangeContact(sessionId, data) {
  return request(`/communicationTools/contact/exchange/${sessionId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function rateMatch(matchId, data) {
  return request(`/matchingSystem/feedback/${matchId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getNextOneMinuteMatch(eventId) {
  return request(`/matchingSystem/one-minute/${eventId}`);
}

export function getSessionMetrics(sessionId) {
  return request(`/communicationTools/analytics/${sessionId}`);
}

