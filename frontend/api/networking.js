import apiFetch from '../utils/api.js';

export function fetchNetworkingEvents() {
  return apiFetch('/events/networking');
}

export function fetchHostedNetworkingEvents() {
  return apiFetch('/events/networking/host');
}

export function attendNetworkingEvent(eventId) {
  return apiFetch(`/events/networking/attend/${eventId}`, { method: 'POST' });
}

export function startVideo(sessionId, data = {}) {
  return apiFetch(`/communicationTools/video/start/${sessionId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function endVideo(sessionId) {
  return apiFetch(`/communicationTools/video/end/${sessionId}`, { method: 'POST' });
}

export function exchangeContact(sessionId, data) {
  return apiFetch(`/communicationTools/contact/exchange/${sessionId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function rateMatch(matchId, data) {
  return apiFetch(`/matchingSystem/feedback/${matchId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getNextOneMinuteMatch(eventId) {
  return apiFetch(`/matchingSystem/one-minute/${eventId}`);
}

export function getSessionMetrics(sessionId) {
  return apiFetch(`/communicationTools/analytics/${sessionId}`);
}

export function getNetworkingDashboard() {
  return apiFetch('/events/networking');
}

export default {
  fetchNetworkingEvents,
  attendNetworkingEvent,
  startVideo,
  endVideo,
  exchangeContact,
  rateMatch,
  getNextOneMinuteMatch,
  getSessionMetrics,
  getNetworkingDashboard,
};


