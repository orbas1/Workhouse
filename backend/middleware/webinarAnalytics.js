const webinarAnalyticsModel = require('../models/webinarAnalytics');
const logger = require('../utils/logger');

function checkWebinarExists(req, res, next) {
  const { webinarId } = req.params;
  const record = webinarAnalyticsModel.getWebinarAnalytics(webinarId);
  if (!record) {
    logger.error('Webinar analytics not found', { webinarId });
    return res.status(404).json({ error: 'Webinar analytics not found' });
  }
  next();
}

module.exports = { checkWebinarExists };
