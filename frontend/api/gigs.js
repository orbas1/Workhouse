(function(global){
  function authHeaders(token){
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async function listGigs(token){
    const res = await fetch('/api/gigs', { headers: authHeaders(token) });
    if(!res.ok) throw new Error('Failed to fetch gigs');
    return res.json();
  }

  async function createGig(data, token){
    const res = await fetch('/api/gigs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create gig');
    return res.json();
  }

  async function updateGig(gigId, data, token){
    const res = await fetch(`/api/gigs/${gigId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to update gig');
    return res.json();
  }

  async function deleteGig(gigId, token){
    const res = await fetch(`/api/gigs/${gigId}`, {
      method: 'DELETE',
      headers: authHeaders(token)
    });
    if(!res.ok) throw new Error('Failed to delete gig');
    return res.json();
  }

  async function getMyGigs(){
    const res = await apiFetch('/api/gigs/my-gigs');
    if(!res.ok) throw new Error('Failed to load gigs');
    return res.json();
  }

  async function getAppliedGigs(){
    const res = await apiFetch('/api/gigs/applied');
    if(!res.ok) throw new Error('Failed to load gigs');
    return res.json();
  }

  async function searchGigs(params){
    const query = new URLSearchParams(params).toString();
    const res = await apiFetch(`/api/gigs/search?${query}`);
    if(!res.ok) throw new Error('Failed to search gigs');
    return res.json();
  }

  global.gigsAPI = { listGigs, createGig, updateGig, deleteGig, getMyGigs, getAppliedGigs, searchGigs };
})(window);
