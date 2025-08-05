(function(global){
  async function getCreatorSeries(){
    const res = await apiFetch('/api/podcast-analytics/creator/series');
    if(!res.ok){
      throw new Error('Failed to load podcast series');
    }
    return res.json();
  }

  async function getCreatorWebinars(){
    const res = await apiFetch('/api/webinar-analytics/creator/webinars');
    if(!res.ok){
      throw new Error('Failed to load webinars');
    }
    return res.json();
  }

  async function getTrendingPodcasts(){
    const res = await apiFetch('/api/third-party/podcast');
    if(!res.ok){
      throw new Error('Failed to load trending podcasts');
    }
    return res.json();
  }

  global.creatorAPI = { getCreatorSeries, getCreatorWebinars, getTrendingPodcasts };
})(window);
