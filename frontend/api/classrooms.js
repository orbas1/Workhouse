(function (global) {
  async function getMessages(classroomId) {
    const res = await apiFetch(`/classroom/${classroomId}/messages`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  }

  async function sendMessage(classroomId, data) {
    const res = await apiFetch(`/classroom/${classroomId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  }

  global.classroomsAPI = { getMessages, sendMessage };
})(window);
