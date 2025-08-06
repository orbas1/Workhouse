(function(global){
  async function getOverview() {
    const res = await apiFetch('/stats/overview');
    if (!res.ok) {
      throw new Error('Failed to load stats overview');
    }
    return res.json();
  }

  global.statsAPI = { getOverview };
})(window);
