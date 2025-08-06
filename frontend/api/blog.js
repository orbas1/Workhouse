(function(global){
  async function getPosts(category){
    const url = category ? `/api/blog/posts?category=${encodeURIComponent(category)}` : '/api/blog/posts';
    const res = await apiFetch(url);
    if(!res.ok) throw new Error('Failed to load posts');
    return res.json();
  }

  async function getCategories(){
    const res = await apiFetch('/api/blog/categories');
    if(!res.ok) throw new Error('Failed to load categories');
    return res.json();
  }

  global.blogAPI = { getPosts, getCategories };
})(window);
