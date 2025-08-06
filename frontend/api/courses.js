(function(global){
  const request = global.apiFetch;

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
