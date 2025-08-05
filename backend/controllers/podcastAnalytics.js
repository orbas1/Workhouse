const {
  getOverview,
  getEpisodeAnalytics,
  getDemographics,
  getEngagement,
  getSeriesOverview,
  getEpisodeDetails,
} = require('../services/podcastAnalytics');
const logger = require('../utils/logger');

async function overviewHandler(req, res) {
  try {
    const data = await getOverview(req.query);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve podcast analytics overview', { error: err.message });
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function episodeAnalyticsHandler(req, res) {
  try {
    const data = await getEpisodeAnalytics(req.params.episodeId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve episode analytics', {
      error: err.message,
      episodeId: req.params.episodeId,
    });
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function demographicsHandler(req, res) {
  try {
    const data = await getDemographics(req.params.podcastId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve podcast demographics', {
      error: err.message,
      podcastId: req.params.podcastId,
    });
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function engagementHandler(req, res) {
  try {
    const data = await getEngagement(req.params.podcastId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve podcast engagement metrics', {
      error: err.message,
      podcastId: req.params.podcastId,
    });
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function seriesOverviewHandler(req, res) {
  try {
    const data = await getSeriesOverview(req.params.seriesId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve series analytics overview', {
      error: err.message,
      seriesId: req.params.seriesId,
    });
    res.status(err.status || 500).json({ error: err.message });
  }
}

async function episodeDetailsHandler(req, res) {
  try {
    const data = await getEpisodeDetails(req.params.episodeId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to retrieve detailed episode analytics', {
      error: err.message,
      episodeId: req.params.episodeId,
    });
    res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  overviewHandler,
  episodeAnalyticsHandler,
  demographicsHandler,
  engagementHandler,
  seriesOverviewHandler,
  episodeDetailsHandler,
};
