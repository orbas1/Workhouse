(function(global){
  async function listConnections(){
    const res = await apiFetch('/api/connections');
    if(!res.ok) throw new Error('Failed to load connections');
    return res.json();
  }

  async function createConnection(data){
    const res = await apiFetch('/api/connections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create connection');
    return res.json();
  }

  async function updateConnection(id, data){
    const res = await apiFetch(`/api/connections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to update connection');
    return res.json();
  }

  global.connectionsAPI = { listConnections, createConnection, updateConnection };
})(window);
