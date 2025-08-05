(function(global){
  async function getNetworkingDashboard() {
    const res = await apiFetch('/events/networking');
    if (!res.ok) {
      throw new Error('Failed to load networking data');
    }
    return res.json();
  }
  global.networkingAPI = { getNetworkingDashboard };
})(window);
