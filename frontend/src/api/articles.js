import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listArticles() {
  try {
    const res = await axios.get(`${API_URL}/articles`, { headers: authHeader() });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch articles', err);
    throw new Error('Unable to fetch articles');
  }
}

export async function getArticle(id) {
  try {
    const res = await axios.get(`${API_URL}/articles/${id}`, { headers: authHeader() });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch article', err);
    throw new Error('Unable to fetch article');
  }
}

export async function likeArticle(id) {
  try {
    const res = await axios.post(`${API_URL}/articles/${id}/like`, {}, { headers: authHeader() });
    return res.data;
  } catch (err) {
    console.error('Failed to like article', err);
    throw new Error('Unable to like article');
  }
}

export async function addComment(id, content) {
  try {
    const res = await axios.post(
      `${API_URL}/articles/${id}/comments`,
      { content },
      { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (err) {
    console.error('Failed to add comment', err);
    throw new Error('Unable to add comment');
  }
}
