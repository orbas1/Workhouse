(function(global){
  async function searchJobSeekers(query, token){
    const res = await fetch(`/api/headhunter/search-job-seekers?query=${encodeURIComponent(query)}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(!res.ok) throw new Error('Failed to search job seekers');
    return res.json();
  }

  async function getRecommendations(token){
    const res = await fetch('/api/headhunter/recommendations', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(!res.ok) throw new Error('Failed to load recommendations');
    return res.json();
  }

  global.headhunterAPI = { searchJobSeekers, getRecommendations };
})(window);
