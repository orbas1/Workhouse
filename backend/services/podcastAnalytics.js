const logger = require('../utils/logger');
const podcastModel = require('../models/podcastAnalytics');

async function getOverview(range = {}) {
  logger.info('Fetching podcast analytics overview', { range });
  return podcastModel.getOverview(range);
}

async function getEpisodeAnalytics(episodeId) {
  const analytics = podcastModel.getEpisodeAnalytics(episodeId);
  if (!analytics) {
    const error = new Error('Episode analytics not found');
    error.status = 404;
    throw error;
  }
  logger.info('Episode analytics retrieved', { episodeId });
  return analytics;
}

async function getDemographics(podcastId) {
  const demographics = podcastModel.getDemographics(podcastId);
  if (!demographics) {
    const error = new Error('Podcast demographics not found');
    error.status = 404;
    throw error;
  }
  logger.info('Podcast demographics retrieved', { podcastId });
  return demographics;
}

async function getEngagement(podcastId) {
  const engagement = podcastModel.getEngagement(podcastId);
  if (!engagement) {
    const error = new Error('Podcast engagement metrics not found');
    error.status = 404;
    throw error;
  }
  logger.info('Podcast engagement retrieved', { podcastId });
  return engagement;
}

async function getSeriesOverview(seriesId) {
  const overview = podcastModel.getSeriesOverview(seriesId);
  if (!overview) {
    const error = new Error('Series analytics not found');
    error.status = 404;
    throw error;
  }
  logger.info('Series analytics overview retrieved', { seriesId });
  return overview;
}

async function getEpisodeDetails(episodeId) {
  const details = podcastModel.getEpisodeDetails(episodeId);
  if (!details) {
    const error = new Error('Episode analytics not found');
    error.status = 404;
    throw error;
  }
  logger.info('Detailed episode analytics retrieved', { episodeId });
  return details;
}

async function getPodcast(podcastId) {
  return podcastModel.getPodcast(podcastId);
}

async function getEpisode(episodeId) {
  return podcastModel.getEpisode(episodeId);
}

async function recordListen(podcastId) {
  const listens = podcastModel.recordListen(podcastId);
  if (listens === null) {
    const error = new Error('Podcast not found');
    error.status = 404;
    throw error;
  }
  logger.info('Recorded podcast listen', { podcastId, listens });
  return { listens };
async function getCreatorSeries(ownerId) {
  logger.info('Fetching creator series', { ownerId });
  return podcastModel.getSeriesByOwner(ownerId);
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
  getCreatorSeries,
};
