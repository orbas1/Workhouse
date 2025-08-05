(function() {
  function getBaseUrl() {
    return window.env && window.env.API_BASE_URL ? window.env.API_BASE_URL : '';
  }

  async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token');
    const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      headers,
    });
    return response;
  }

  window.apiFetch = apiFetch;
})();
