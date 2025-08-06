import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listArticles() {
  const res = await axios.get(`${API_URL}/articles`, { headers: authHeader() });
  return res.data;
}

export async function getArticle(id) {
  const res = await axios.get(`${API_URL}/articles/${id}`, { headers: authHeader() });
  return res.data;
}

export async function likeArticle(id) {
  const res = await axios.post(`${API_URL}/articles/${id}/like`, {}, { headers: authHeader() });
  return res.data;
}

export async function addComment(id, content) {
  const res = await axios.post(
    `${API_URL}/articles/${id}/comments`,
    { content },
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
}
