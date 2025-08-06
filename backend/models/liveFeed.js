const { randomUUID } = require('crypto');

// Demo posts covering a wide range of categories that may appear in the
// live feed. Each post tracks basic engagement metrics and metadata.
const posts = [
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
  {
    id: randomUUID(),
    author: 'Alice',
    content: 'New gig available: Graphic design project.',
    category: 'gig',
    createdAt: new Date(),
    likes: 1,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'Bob',
    content: 'Freelance contract: 6 month web dev position.',
    category: 'contract',
    createdAt: new Date(),
    likes: 2,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'Carol',
    content: 'Jane Doe just created a new profile.',
    category: 'profile',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'CourseBot',
    content: 'New course published: Advanced React Patterns.',
    category: 'course',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'EventsTeam',
    content: 'Live webinar scheduled: Intro to Data Science.',
    category: 'webinar',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'Academy',
    content: 'Free course class: Python Basics starts tomorrow.',
    category: 'class',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'Podcaster',
    content: 'Live podcast scheduled: Startup Stories.',
    category: 'podcast',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'TaskMaster',
    content: 'New task uploaded: Fix bug in authentication flow.',
    category: 'tasks',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
  {
    id: randomUUID(),
    author: 'Networking',
    content: 'Upcoming networking session: Tech meet this Friday.',
    category: 'networking',
    createdAt: new Date(),
    likes: 0,
    comments: [],
    shares: 0,
    reports: 0,
  },
];

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
