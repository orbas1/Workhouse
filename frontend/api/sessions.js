(function(global) {
  const request = global.apiFetch;

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
