(function(global){
  function getUserFromToken(){
    const token = localStorage.getItem('token');
    if(!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch(err){
      return null;
    }
  }
  global.authUtils = { getUserFromToken };
})(window);
