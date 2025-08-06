import apiClient from '../utils/apiClient.js';

export async function fetchCategories() {
  const { data } = await apiClient.get('/blog/categories');
  return data;
}

export async function fetchPosts(category) {
  const config = category ? { params: { category } } : undefined;
  const { data } = await apiClient.get('/blog/posts', config);
  return data;
}
