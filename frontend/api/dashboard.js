(function(global){
  async function getAffiliateDashboard(affiliateId) {
    const res = await apiFetch(`/api/affiliates/dashboard/${affiliateId}`);
    if (!res.ok) {
      throw new Error('Failed to load affiliate dashboard');
    }
    return res.json();
  }

  async function getClientDashboard() {
    const res = await apiFetch('/dashboard/client');
    if (!res.ok) {
      throw new Error('Failed to load client dashboard');
    }
    return res.json();
  }

  async function getFreelancerDashboard() {
    const res = await apiFetch('/dashboard/freelancer');
    if (!res.ok) {
      throw new Error('Failed to load freelancer dashboard');
    }
    return res.json();
  }

  global.dashboardAPI = { getAffiliateDashboard, getClientDashboard, getFreelancerDashboard };
})(window);
