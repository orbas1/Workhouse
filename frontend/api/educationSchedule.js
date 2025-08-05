(function(global){
  async function listEvents(){
    const res = await apiFetch('/education/schedule');
    if(!res.ok) throw new Error('Failed to load schedule');
    return res.json();
  }

  async function createEvent(data){
    const res = await apiFetch('/education/schedule', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create event');
    return res.json();
  }

  global.educationScheduleAPI = { listEvents, createEvent };
})(window);
