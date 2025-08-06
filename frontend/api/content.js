(function (global) {
  const request = global.apiFetch;

  function listContent() {
    return request('/content');
  }

  function createContent(data) {
    return request('/content/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  function updateContent(id, data) {
    return request(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  function deleteContent(id) {
    return request(`/content/${id}`, { method: 'DELETE' });
  }

  global.contentAPI = { listContent, createContent, updateContent, deleteContent };
})(window);
