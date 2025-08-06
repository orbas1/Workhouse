(function (global) {
  const baseUrl = (global.env && global.env.API_BASE_URL) || '';

  function headers() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async function listContent() {
    const res = await fetch(`${baseUrl}/content`, { headers: headers() });
    if (!res.ok) throw new Error('Failed to fetch content');
    return res.json();
  }

  async function createContent(data) {
    const res = await fetch(`${baseUrl}/content/create`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create content');
    return res.json();
  }

  async function updateContent(id, data) {
    const res = await fetch(`${baseUrl}/content/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update content');
    return res.json();
  }

  async function deleteContent(id) {
    const res = await fetch(`${baseUrl}/content/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw new Error('Failed to delete content');
    return true;
  }

  global.contentAPI = { listContent, createContent, updateContent, deleteContent };
})(window);
