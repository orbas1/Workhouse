(function (global) {
  async function getProgressDashboard(userId) {
    const res = await apiFetch(`/api/progress/dashboard/${userId}`);
    if (!res.ok) {
      throw new Error('Failed to load progress dashboard');
    }
    return res.json();
  }

  async function getTasks(userId) {
    const res = await apiFetch(`/api/progress/tasks/${userId}`);
    if (!res.ok) {
      throw new Error('Failed to load tasks');
    }
    return res.json();
  }

  global.progressAPI = { getProgressDashboard, getTasks };
})(window);
