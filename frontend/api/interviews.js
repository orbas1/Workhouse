(function(global){
  async function getInterview(id){
    const res = await apiFetch(`/api/interviews/${id}`);
    if(!res.ok) throw new Error('Failed to load interview');
    return res.json();
  }
  async function addNote(id, text){
    const res = await apiFetch(`/api/interviews/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if(!res.ok) throw new Error('Failed to add note');
    return res.json();
  }
  global.interviewAPI = { getInterview, addNote };
})(window);
