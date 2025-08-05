const applicationService = require('../services/application');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  const { applicationId } = req.params;
  const application = await applicationService.getApplicationById(applicationId);
  if (!application) {
    logger.error('Application not found', { applicationId });
    return res.status(404).json({ error: 'Application not found' });
  }
  req.application = application;
  next();
};
