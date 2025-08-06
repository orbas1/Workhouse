(function(global){
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';

  async function listOpportunities(params = {}){
    const token = localStorage.getItem('token');
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${baseUrl}/opportunities${query ? `?${query}` : ''}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if(!res.ok) throw new Error('Failed to fetch opportunities');
    return res.json();
  }

  async function getOpportunity(id){
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}/opportunities/${id}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if(!res.ok) throw new Error('Failed to fetch opportunity');
    return res.json();
  }

  global.opportunitiesAPI = { listOpportunities, getOpportunity };
})(window);
