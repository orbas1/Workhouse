const { randomUUID } = require('crypto');

const articles = [
  {
    id: randomUUID(),
    title: 'Welcome to Workhouse Blog',
    author: { name: 'Admin', avatar: '' },
    content: 'This is a sample article to get started.',
    createdAt: new Date(),
    readingTime: 3,
    likes: 0,
    comments: [],
  },
];

function listArticles() {
  return articles;
}

function getArticle(id) {
  return articles.find(a => a.id === id) || null;
}

function addComment(id, { author, content }) {
  const article = getArticle(id);
  if (!article) return null;
  const comment = { id: randomUUID(), author, content, createdAt: new Date() };
  article.comments.push(comment);
  return comment;
}

function addLike(id) {
  const article = getArticle(id);
  if (!article) return null;
  article.likes = (article.likes || 0) + 1;
  return article;
}

module.exports = { listArticles, getArticle, addComment, addLike };
