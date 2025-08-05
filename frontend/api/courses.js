(function(global){
  const baseUrl = (global.env && global.env.API_BASE_URL) || '/api';

  async function request(path, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };
    const res = await fetch(`${baseUrl}${path}`, { ...options, headers });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Request failed');
    }
    return res.json();
  }

  function listCourses(){
    return request('/courses');
  }

  function getCourse(id){
    return request(`/courses/${id}`);
  }

  function purchaseCourse(id, data){
    return request(`/courses/${id}/purchase`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  global.coursesAPI = { listCourses, getCourse, purchaseCourse };
})(window);
