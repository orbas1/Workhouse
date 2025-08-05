(function(global){
  async function getAffiliateDashboard(affiliateId) {
    const res = await apiFetch(`/api/affiliates/dashboard/${affiliateId}`);
    if (!res.ok) {
      throw new Error('Failed to load affiliate dashboard');
    }
    return res.json();
  }
  global.dashboardAPI = { getAffiliateDashboard };
})(window);
