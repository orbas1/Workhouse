const { getPodcast, getEpisode, getSeriesOverview } = require('../services/podcastAnalytics');
const logger = require('../utils/logger');

/**
 * Ensure that a user with the 'creator' role owns the requested podcast resource.
 * Admins and content managers bypass this check.
 */
module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      logger.error('podcastOwnership: missing authenticated user');
      return res.status(401).json({ error: 'Authentication required' });
    }

    const roles = Array.isArray(user.roles) ? user.roles : [user.role];
    if (roles.includes('admin') || roles.includes('content-manager')) {
      return next();
    }

    if (!roles.includes('creator')) {
      logger.error('podcastOwnership: user lacks creator role', { userId: user.id });
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { seriesId, podcastId, episodeId } = req.params;
    const userId = user.id;

    if (seriesId) {
      const series = await getSeriesOverview(seriesId);
      if (!series || series.ownerId !== userId) {
        logger.error('Unauthorized series access attempt', { seriesId, userId });
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    if (podcastId) {
      const podcast = await getPodcast(podcastId);
      if (!podcast || podcast.ownerId !== userId) {
        logger.error('Unauthorized podcast access attempt', { podcastId, userId });
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    if (episodeId) {
      const episode = await getEpisode(episodeId);
      if (!episode || episode.ownerId !== userId) {
        logger.error('Unauthorized episode access attempt', { episodeId, userId });
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    return next();
  } catch (err) {
    logger.error('podcastOwnership middleware error', { error: err.message });
    return res.status(500).json({ error: 'Internal server error' });
  }
};
