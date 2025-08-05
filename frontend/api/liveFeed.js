(function(global){
  async function getPosts(category){
    const url = category ? `/api/live-feed/posts?category=${encodeURIComponent(category)}` : '/api/live-feed/posts';
    const res = await apiFetch(url);
    if(!res.ok) throw new Error('Failed to load posts');
    return res.json();
  }

  async function createPost(data){
    const res = await apiFetch('/api/live-feed/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Failed to create post');
    return res.json();
  }

  async function getEvents(){
    const res = await apiFetch('/api/live-feed/events');
    if(!res.ok) throw new Error('Failed to load events');
    return res.json();
  }

  async function likePost(postId){
    const res = await apiFetch(`/api/live-feed/posts/${postId}/like`, { method: 'POST' });
    if(!res.ok) throw new Error('Failed to like post');
    return res.json();
  }

  global.liveFeedAPI = { getPosts, createPost, getEvents, likePost };
})(window);
