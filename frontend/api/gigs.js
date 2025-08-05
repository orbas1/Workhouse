(function(global){
  async function listGigs(token){
    const res = await fetch('/api/gigs', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if(!res.ok) throw new Error('Failed to fetch gigs');
    return res.json();
  }

  async function createGig(data, token){
    const res = await fetch('/api/gigs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create gig');
    return res.json();
  }

  async function updateGig(gigId, data, token){
    const res = await fetch(`/api/gigs/${gigId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to update gig');
    return res.json();
  }

  async function deleteGig(gigId, token){
    const res = await fetch(`/api/gigs/${gigId}`, {
      method: 'DELETE',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if(!res.ok) throw new Error('Failed to delete gig');
    return res.json();
  }

  global.gigsAPI = { listGigs, createGig, updateGig, deleteGig };
})(window);
