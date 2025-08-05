(function(global){
  async function listEvents(userId){
    const res = await apiFetch(`/api/service-providers/calendar?userId=${userId}`);
    if(!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  }

  async function createEvent(data){
    const res = await apiFetch('/api/service-providers/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create event');
    return res.json();
  }

  async function updateEvent(id, data){
    const res = await apiFetch(`/api/service-providers/calendar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to update event');
    return res.json();
  }

  async function deleteEvent(id){
    const res = await apiFetch(`/api/service-providers/calendar/${id}`, { method: 'DELETE' });
    if(!res.ok) throw new Error('Failed to delete event');
    return res.json();
  }

  global.calendarAPI = { listEvents, createEvent, updateEvent, deleteEvent };
})(window);
