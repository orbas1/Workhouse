import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchPopularPodcasts() {
  const { data } = await axios.get(`${API_BASE}/third-party/podcast`);
  return data;
}

export async function recordPodcastListen(podcastId) {
  const { data } = await axios.post(`${API_BASE}/podcast-analytics/${podcastId}/listen`);
  return data;
}
