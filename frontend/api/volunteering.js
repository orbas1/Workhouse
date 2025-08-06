(function (global) {
  async function getDashboard() {
    const res = await apiFetch('/volunteering/dashboard');
    if (!res.ok) throw new Error('Failed to load volunteering dashboard');
    return res.json();
  }

  global.volunteeringAPI = { getDashboard };
})(window);

