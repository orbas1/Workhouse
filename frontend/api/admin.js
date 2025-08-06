(function(global){
  async function listEmployees() {
    const res = await apiFetch('/hr/employees');
    if (!res.ok) throw new Error('Failed to load employees');
    return res.json();
  }

  async function createEmployee(data) {
    const res = await apiFetch('/hr/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create employee');
    return res.json();
  }

  async function updateEmployee(id, data) {
    const res = await apiFetch(`/hr/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update employee');
    return res.json();
  }

  async function deleteEmployee(id) {
    const res = await apiFetch(`/hr/employees/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
  }

  async function getConfig() {
    const res = await apiFetch('/config');
    if (!res.ok) throw new Error('Failed to load config');
    return res.json();
  }

  async function updateConfig(data) {
    const res = await apiFetch('/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update config');
    return res.json();
  }

  global.adminAPI = {
    listEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getConfig,
    updateConfig
  };
})(window);
