const model = require('../models/blog');
const sanitize = require('../utils/sanitize');
const logger = require('../utils/logger');

async function getPosts(category) {
  return model.listPosts(category);
}

async function getCategories() {
  return model.listCategories();
}

async function getPost(id) {
  return model.getPost(id);
}

module.exports = { getPosts, getCategories, getPost };
