(function(global){
  async function searchFreelancers(params={}){
    const query = new URLSearchParams(params).toString();
    return global.apiFetch(`/freelancers/search?${query}`);
  }

  global.freelancersAPI = { searchFreelancers };
})(window);
