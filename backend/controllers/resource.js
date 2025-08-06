const {
  listServices,
  getServiceById,
  requestService,
  getResourcesByType,
  getLegalResources,
  subscribeFundingAlerts,
  getFundingAlerts,
  applyMentorship,
  listMentors,
} = require('../services/resource');
const logger = require('../utils/logger');

async function listServicesHandler(req, res) {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      location: req.query.location,
    };
    const services = await listServices(filters);
    res.json(services);
  } catch (err) {
    logger.error('Failed to list services', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getServiceHandler(req, res) {
  try {
    const service = await getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    logger.error('Failed to get service', { error: err.message, id: req.params.id });
    res.status(500).json({ error: err.message });
  }
}

async function requestServiceHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const request = await requestService(userId, req.body);
    res.status(201).json(request);
  } catch (err) {
    logger.error('Failed to request service', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getResourcesByTypeHandler(req, res) {
  const { resourceType } = req.params;
  try {
    const items = await getResourcesByType(resourceType);
    res.json(items);
  } catch (err) {
    logger.error('Failed to retrieve resources', { error: err.message, resourceType });
    res.status(500).json({ error: err.message });
  }
}

async function getLegalResourcesHandler(req, res) {
  const { region } = req.params;
  try {
    const items = await getLegalResources(region);
    res.json(items);
  } catch (err) {
    logger.error('Failed to retrieve legal resources', { error: err.message, region });
    res.status(500).json({ error: err.message });
  }
}

async function subscribeFundingAlertsHandler(req, res) {
  try {
    const subscription = await subscribeFundingAlerts(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    logger.error('Failed to subscribe to funding alerts', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getFundingAlertsHandler(req, res) {
  const { profileId } = req.params;
  try {
    const alerts = await getFundingAlerts(profileId);
    res.json(alerts);
  } catch (err) {
    logger.error('Failed to retrieve funding alerts', { error: err.message, profileId });
    res.status(500).json({ error: err.message });
  }
}

async function applyMentorshipHandler(req, res) {
  try {
    const application = await applyMentorship(req.body);
    res.status(201).json(application);
  } catch (err) {
    logger.error('Failed to apply for mentorship', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listMentorsHandler(req, res) {
  try {
    const mentors = await listMentors();
    res.json(mentors);
  } catch (err) {
    logger.error('Failed to list mentors', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listServicesHandler,
  getServiceHandler,
  requestServiceHandler,
  getResourcesByTypeHandler,
  getLegalResourcesHandler,
  subscribeFundingAlertsHandler,
  getFundingAlertsHandler,
  applyMentorshipHandler,
  listMentorsHandler,
};
