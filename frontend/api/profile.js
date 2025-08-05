(function(global){
  async function getProfile(userId, token){
    const res = await fetch(`/api/profiles/user/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if(!res.ok) throw new Error('Failed to load profile');
    return res.json();
  }
  async function updateProfile(userId, data, token){
    const res = await fetch(`/api/profiles/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to update profile');
    return res.json();
  }
  global.profileAPI = { getProfile, updateProfile };
})(window);
