const podcastModel = require('../models/podcastAnalytics');
const expertAccessModel = require('../models/expertAccess');
const logger = require('../utils/logger');

async function getContentLibrary() {
  logger.info('Retrieving content library');
  const podcasts = podcastModel.getAllPodcasts().map(p => ({
    id: p.podcastId,
    title: p.title || 'Podcast',
    description: p.description || '',
    thumbnail: p.thumbnail || null,
  }));
  const webinars = expertAccessModel.getWebinars().map(w => ({
    id: w.id,
    title: w.title,
    description: w.description || '',
    scheduledAt: w.scheduledAt,
  }));
  return { podcasts, webinars };
}

async function getContentDetails(type, id) {
  logger.info('Retrieving content details', { type, id });
  if (type === 'podcast') {
    return podcastModel.getPodcast(id);
  }
  if (type === 'webinar') {
    return expertAccessModel.getWebinars().find(w => w.id === id) || null;
  }
  return null;
}

module.exports = { getContentLibrary, getContentDetails };
