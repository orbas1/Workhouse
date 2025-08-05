(function(global){
  async function getLandingContent(){
    try {
      const res = await apiFetch('/landing/content');
      return res;
    } catch(err){
      console.error('Failed to fetch landing content', err);
      return { features: [], testimonials: [], partners: [], badges: [] };
    }
  }
  global.landingAPI = { getLandingContent };
})(window);
