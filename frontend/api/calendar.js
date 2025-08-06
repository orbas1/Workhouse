(function(global){
  async function listEvents(){
    const res = await apiFetch('/calendar/events');
    if(!res.ok) throw new Error('Failed to fetch calendar events');
    return res.json();
  }

  async function createEvent(data){
    const res = await apiFetch('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create event');
    return res.json();
  }

  global.calendarAPI = { listEvents, createEvent };
})(window);
