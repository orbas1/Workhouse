(function(global){
  async function scheduleInterview(data){
    const res = await apiFetch('/api/interviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to schedule interview');
    return res.json();
  }

  async function getUserInterviews(){
    const res = await apiFetch('/api/interviews/user');
    if(!res.ok) throw new Error('Failed to load interviews');
    return res.json();
  }

  async function getEmployerInterviews(){
    const res = await apiFetch('/api/interviews/employer');
    if(!res.ok) throw new Error('Failed to load interviews');
    return res.json();
  }

  async function updateInterviewStatus(id, status){
    const res = await apiFetch(`/api/interviews/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if(!res.ok) throw new Error('Failed to update status');
    return res.json();
  }

  global.interviewAPI = { scheduleInterview, getUserInterviews, getEmployerInterviews, updateInterviewStatus };
})(window);
