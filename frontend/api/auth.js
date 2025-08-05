(function(global){
  async function register(data){
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Registration failed');
    return res.json();
  }

  async function login(data){
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Login failed');
    return res.json();
  }

  global.authAPI = { register, login };
})(window);
