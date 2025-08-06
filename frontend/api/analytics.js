(function(global){
  async function getLiveFeedEngagement(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await apiFetch(`/analytics/live-feed/engagement${query ? `?${query}` : ''}`);
    if (!res.ok) {
      throw new Error('Failed to fetch engagement analytics');
    }
    return res.json();
  }
  global.analyticsAPI = { getLiveFeedEngagement };
})(window);
