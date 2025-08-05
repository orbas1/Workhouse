(function(global){
  function formatDateTime(value){
    try {
      return new Date(value).toLocaleString();
    } catch(e){
      return value;
    }
  }
  global.dateUtils = { formatDateTime };
})(window);
