(function(global){
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';

  async function searchFreelancers(params={}){
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${baseUrl}/freelancers/search?${query}`, {
      headers: { 'Content-Type': 'application/json', ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {}) }
    });
    if(!res.ok) throw new Error('Failed to fetch freelancers');
    return res.json();
  }

  global.freelancersAPI = { searchFreelancers };
})(window);
