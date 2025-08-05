const { randomUUID } = require('crypto');

const posts = [
  {
    id: randomUUID(),
    author: 'System',
    content: 'Welcome to the live feed!',
    category: 'general',
    createdAt: new Date(),
    likes: 0,
  },
];

const events = [
  { id: randomUUID(), title: 'Weekly Webinar', startTime: new Date() },
];

function listPosts(category) {
  return category ? posts.filter(p => p.category === category) : posts;
}

function addPost({ author, content, category }) {
  const post = { id: randomUUID(), author, content, category, createdAt: new Date(), likes: 0 };
  posts.unshift(post);
  return post;
}

function listEvents() {
  return events;
}

function getPost(postId) {
  return posts.find(p => p.id === postId) || null;
}

function addLike(postId) {
  const post = getPost(postId);
  if (!post) return null;
  post.likes = (post.likes || 0) + 1;
  return post;
}

module.exports = { listPosts, addPost, listEvents, getPost, addLike };
