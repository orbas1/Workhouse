const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

// Load demo posts from a JSON file so the live feed renders with
// substantial dummy content during development.
const dataPath = path.join(__dirname, '..', 'data', 'liveFeedPosts.json');
let posts = [];

if (fs.existsSync(dataPath)) {
  const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  posts = raw.map(p => ({
    id: p.id || randomUUID(),
    author: p.author || 'Unknown',
    content: p.content || '',
    category: p.category || 'general',
    createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
    likes: p.likes || 0,
    comments: p.comments || [],
    shares: p.shares || 0,
    reports: p.reports || 0,
  }));
} else {
  posts = [
    {
      id: randomUUID(),
      author: 'System',
      content: 'Welcome to the live feed!',
      category: 'general',
      createdAt: new Date(),
      likes: 0,
      comments: [],
      shares: 0,
      reports: 0,
    },
  ];
}

const events = [
  { id: randomUUID(), title: 'Weekly Webinar', startTime: new Date() },
];

function listPosts(category) {
  return category ? posts.filter(p => p.category === category) : posts;
}

function addPost({ author, content, category }) {
  const post = {
    id: randomUUID(),
    author,
    content,
    category,
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  };
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

function addComment(postId, { author, content }) {
  const post = getPost(postId);
  if (!post) return null;
  const comment = { id: randomUUID(), author, content, createdAt: new Date() };
  post.comments.push(comment);
  return post;
}

function addShare(postId) {
  const post = getPost(postId);
  if (!post) return null;
  post.shares = (post.shares || 0) + 1;
  return post;
}

function reportPost(postId) {
  const post = getPost(postId);
  if (!post) return null;
  post.reports = (post.reports || 0) + 1;
  return post;
}

module.exports = {
  listPosts,
  addPost,
  listEvents,
  getPost,
  addLike,
  addComment,
  addShare,
  reportPost,
};
