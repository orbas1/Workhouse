import apiClient from '../utils/apiClient.js';

export async function fetchContentLibrary() {
  const { data } = await apiClient.get('/content-library');
  return data;
}

export async function fetchContentDetails(type, id) {
  const { data } = await apiClient.get(`/content-library/${type}/${id}`);
  return data;
}
