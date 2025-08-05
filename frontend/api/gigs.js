(function(global){
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

  global.gigsAPI = { getMyGigs, getAppliedGigs };
})(window);
