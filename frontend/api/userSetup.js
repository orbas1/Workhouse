(function(global){
  async function saveFinancialMedia(userId, data){
    const res = await apiFetch(`/user-setup/${userId}/financial-media`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to save setup');
    return res.json();
  }

  async function getFinancialMedia(userId){
    const res = await apiFetch(`/user-setup/${userId}/financial-media`);
    if(!res.ok) throw new Error('Failed to load setup');
    return res.json();
  }

  global.userSetupAPI = { saveFinancialMedia, getFinancialMedia };
})(window);
