import apiClient from '../utils/apiClient.js';

export async function uploadCv(file) {
  const formData = new FormData();
  formData.append('cv', file);
  const { data } = await apiClient.post('/resume/cv/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

export async function generateCv(prompt) {
  const { data } = await apiClient.post('/resume/cv/generate', { prompt });
  return data;
}

export async function uploadCoverLetter(file) {
  const formData = new FormData();
  formData.append('coverLetter', file);
  const { data } = await apiClient.post('/resume/cover-letter/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

export async function generateCoverLetter(prompt) {
  const { data } = await apiClient.post('/resume/cover-letter/generate', { prompt });
  return data;
}

export async function fetchResume() {
  const { data } = await apiClient.get('/resume');
  return data;
}

export async function analyzeCv(content) {
  const { data } = await apiClient.post('/resume/cv/analyze', { content });
  return data;
}
