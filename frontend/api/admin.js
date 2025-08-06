(function(global){
  async function fetchSystemSettings(){
    const res = await apiFetch('/admin/system-settings');
    if(!res.ok) throw new Error('Failed to load settings');
    return res.json();
  }
  async function updateSystemSettings(payload){
    const res = await apiFetch('/admin/system-settings', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    if(!res.ok) throw new Error('Failed to update settings');
    return res.json();
  }
  async function listEmployees(){
    const res = await apiFetch('/hr/employees');
    if(!res.ok) throw new Error('Failed to load employees');
    return res.json();
  }
  async function createEmployee(data){
    const res = await apiFetch('/hr/employees', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create employee');
    return res.json();
  }
  global.adminAPI = { fetchSystemSettings, updateSystemSettings, listEmployees, createEmployee };
})(window);
