(function(global) {
  const API_BASE_URL = global.API_BASE_URL || '/api';

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
    return res.json();
  }

  async function getUpcomingSessions(userId) {
    return request(`/sessions/upcoming/${userId}`);
  }

  async function cancelSession(sessionId) {
    return request(`/sessions/cancel/${sessionId}`, { method: 'POST' });
  }

  async function rescheduleSession(sessionId, newTime) {
    return request(`/sessions/reschedule/${sessionId}`, {
      method: 'POST',
      body: JSON.stringify({ newTime }),
    });
  }

  global.sessionsAPI = { getUpcomingSessions, cancelSession, rescheduleSession };
})(window);
