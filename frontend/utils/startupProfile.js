(function(global){
  async function getStartupProfile(){
    const res = await apiFetch('/startups/profile');
    if (res.status === 204) return null;
    return res.json();
  }

  async function saveStartupProfile(data){
    const res = await apiFetch('/startups/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.json();
  }

  global.startupProfileAPI = { getStartupProfile, saveStartupProfile };
})(window);
