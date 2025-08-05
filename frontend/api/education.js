(function(global){
  async function listCourses(){
    const res = await apiFetch('/courses');
    if(!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
  }

  async function getCourse(id){
    const res = await apiFetch(`/courses/${id}`);
    if(!res.ok) throw new Error('Failed to fetch course');
    return res.json();
  }

  async function createCourse(data){
    const res = await apiFetch('/courses/create', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create course');
    return res.json();
  }

  async function addModule(courseId, data){
    const res = await apiFetch(`/courses/${courseId}/modules`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to add module');
    return res.json();
  }

  async function updateModule(courseId, moduleId, data){
    const res = await apiFetch(`/courses/${courseId}/modules/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to update module');
    return res.json();
  }

  async function deleteModule(courseId, moduleId){
    const res = await apiFetch(`/courses/${courseId}/modules/${moduleId}`, {
      method: 'DELETE'
    });
    if(!res.ok) throw new Error('Failed to delete module');
    return res.json();
  }

  async function trackModuleProgress(data){
    const res = await apiFetch('/progress/track', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to track progress');
    return res.json();
  }

  global.educationAPI = { listCourses, getCourse, createCourse, addModule, updateModule, deleteModule, trackModuleProgress };
})(window);
