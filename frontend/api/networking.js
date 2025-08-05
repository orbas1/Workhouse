const API_BASE_URL = window.API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  return res.json().catch(() => ({}));
}

export function startVideo(sessionId, data = {}) {
  return request(`/communication/video/start/${sessionId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function endVideo(sessionId) {
  return request(`/communication/video/end/${sessionId}`, { method: 'POST' });
}

export function exchangeContact(sessionId, data) {
  return request(`/communication/contact/exchange/${sessionId}`, {
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
  return request(`/communication/analytics/${sessionId}`);
}
(function(global){
  async function getNetworkingDashboard() {
    const res = await apiFetch('/events/networking');
    if (!res.ok) {
      throw new Error('Failed to load networking data');
    }
    return res.json();
  }
  global.networkingAPI = { getNetworkingDashboard };
})(window);
