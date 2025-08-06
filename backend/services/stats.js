const model = require('../models/stats');
const logger = require('../utils/logger');

async function getOverview() {
  const data = model.getOverview();
  logger.info('Retrieved stats overview');
  return data;
}

module.exports = { getOverview };
