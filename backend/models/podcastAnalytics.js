const { randomUUID } = require('crypto');

// Sample in-memory data representing analytics records
const episodes = new Map();
const podcasts = new Map();
const seriesStats = new Map();

const ownerId = 'user-123';
const sampleSeriesId = randomUUID();
const samplePodcastId = randomUUID();
const sampleEpisodeId = randomUUID();

seriesStats.set(sampleSeriesId, {
  seriesId: sampleSeriesId,
  ownerId,
  listens: 5000,
  likes: 1200,
  donations: 300,
  engagement: {
    averageListenTime: 1800, // seconds
  },
});

podcasts.set(samplePodcastId, {
  podcastId: samplePodcastId,
  seriesId: sampleSeriesId,
  ownerId,
  engagement: {
    listens: 0,
    avgListenDuration: 1700,
    completionRate: 0.75,
    dropOffRate: 0.2,
  },
  demographics: {
    ageGroups: { '18-24': 40, '25-34': 35, '35-44': 25 },
    locations: { US: 60, UK: 20, CA: 20 },
    genders: { male: 55, female: 45 },
  },
});

episodes.set(sampleEpisodeId, {
  episodeId: sampleEpisodeId,
  podcastId: samplePodcastId,
  seriesId: sampleSeriesId,
  ownerId,
  title: 'Episode 1',
  listeners: 1000,
  likes: 200,
  comments: 50,
  averageListenTime: 1600,
  engagementTimeline: [
    { timestamp: 0, listeners: 1000 },
    { timestamp: 600, listeners: 800 },
    { timestamp: 1200, listeners: 600 },
  ],
  demographics: {
    ageGroups: { '18-24': 45, '25-34': 30, '35-44': 25 },
    locations: { US: 50, UK: 30, CA: 20 },
    genders: { male: 60, female: 40 },
  },
  dropOffRates: { '0-25%': 5, '25-50%': 10, '50-75%': 20, '75-100%': 65 },
});

function getOverview() {
  let totalListeners = 0;
  let totalLikes = 0;
  episodes.forEach((ep) => {
    totalListeners += ep.listeners;
    totalLikes += ep.likes;
  });
  return {
    totalPodcasts: podcasts.size,
    totalEpisodes: episodes.size,
    totalListeners,
    totalLikes,
  };
}

function getEpisode(episodeId) {
  return episodes.get(episodeId);
}

function getEpisodeAnalytics(episodeId) {
  return episodes.get(episodeId);
}

function getPodcast(podcastId) {
  return podcasts.get(podcastId);
}

function getDemographics(podcastId) {
  const podcast = podcasts.get(podcastId);
  return podcast ? podcast.demographics : null;
}

function getEngagement(podcastId) {
  const podcast = podcasts.get(podcastId);
  return podcast ? podcast.engagement : null;
}

function getSeriesOverview(seriesId) {
  return seriesStats.get(seriesId);
}

function getEpisodeDetails(episodeId) {
  return episodes.get(episodeId);
}

function recordListen(podcastId) {
  const podcast = podcasts.get(podcastId);
  if (!podcast) {
    return null;
  }
  podcast.engagement.listens = (podcast.engagement.listens || 0) + 1;
  return podcast.engagement.listens;
}

module.exports = {
  getOverview,
  getEpisodeAnalytics,
  getDemographics,
  getEngagement,
  getSeriesOverview,
  getEpisodeDetails,
  getPodcast,
  getEpisode,
  recordListen,
};
