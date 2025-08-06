import apiClient from '../utils/apiClient.js';

export async function getPodcastSeriesOverview(seriesId) {
  const { data } = await apiClient.get(`/podcast-analytics/series/${seriesId}/overview`);
  return data;
}

export async function getPodcastEpisodeDetails(episodeId) {
  const { data } = await apiClient.get(`/podcast-analytics/episodes/${episodeId}/details`);
  return data;
}

export async function getWebinarOverview() {
  const { data } = await apiClient.get('/webinar-analytics/overview');
  return data;
}
