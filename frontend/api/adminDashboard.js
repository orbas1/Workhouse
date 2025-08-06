(function (global) {
  async function fetchOverview() {
    const res = await apiFetch('/admin/dashboard');
    if (!res.ok) throw new Error('Failed to load dashboard');
    return res.json();
  }

  async function listFlags() {
    const res = await apiFetch('/moderation/flags');
    if (!res.ok) throw new Error('Failed to load flags');
    return res.json();
  }

  async function listTickets() {
    const res = await apiFetch('/support/tickets');
    if (!res.ok) throw new Error('Failed to load tickets');
    return res.json();
  }

  async function listDisputes() {
    const res = await apiFetch('/support/disputes');
    if (!res.ok) throw new Error('Failed to load disputes');
    return res.json();
  }

  global.adminDashboardAPI = { fetchOverview, listFlags, listTickets, listDisputes };
})(window);
