const { randomUUID } = require('crypto');

// Initial sample posts stored in memory. In a production system these
// would reside in a persistent database.
const posts = [
  {
    id: randomUUID(),
    title: 'Welcome to the Workhouse Blog',
    excerpt: 'Insights and updates from the Workhouse community.',
    content:
      'This space shares news, tips and success stories from across the platform. Stay tuned for more.',
    category: 'General',
    image: '',
    createdAt: new Date()
  }
];

function listPosts(category) {
  return category ? posts.filter(p => p.category === category) : posts;
}

function addPost({ title, excerpt, content, category, image }) {
  const post = {
    id: randomUUID(),
    title,
    excerpt,
    content,
    category,
    image: image || '',
    createdAt: new Date()
  };
  posts.unshift(post);
  return post;
}

function getPost(id) {
  return posts.find(p => p.id === id) || null;
}

function listCategories() {
  const counts = {};
  for (const p of posts) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

module.exports = { listPosts, addPost, getPost, listCategories };
