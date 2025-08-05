const {
  createOpportunity,
  listOpportunities,
  recordView,
  updateOpportunity,
  deleteOpportunity,
  getDashboard,
} = require('../services/opportunity');
const logger = require('../utils/logger');

async function listOpportunitiesHandler(req, res) {
  try {
    const { page, limit, ...filters } = req.query;
    const result = await listOpportunities(filters, { page: Number(page), limit: Number(limit) });
    res.json(result);
  } catch (err) {
    logger.error('Failed to list opportunities', { error: err.message, query: req.query });
    res.status(500).json({ error: 'Failed to list opportunities' });
  }
}

async function createOpportunityHandler(req, res) {
  const organizationId = req.user?.username;
  try {
    const opportunity = await createOpportunity(organizationId, req.body);
    res.status(201).json(opportunity);
  } catch (err) {
    logger.error('Failed to create opportunity', { error: err.message, organizationId });
    res.status(400).json({ error: err.message });
  }
}

async function getOpportunityHandler(req, res) {
  try {
    const opportunity = await recordView(req.opportunity.id);
    res.json(opportunity);
  } catch (err) {
    logger.error('Failed to retrieve opportunity', { error: err.message, opportunityId: req.opportunity.id });
    res.status(500).json({ error: 'Failed to retrieve opportunity' });
  }
}

async function updateOpportunityHandler(req, res) {
  const { opportunity } = req;
  try {
    const updated = await updateOpportunity(opportunity.id, req.body);
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update opportunity', { error: err.message, opportunityId: opportunity.id });
    res.status(400).json({ error: err.message });
  }
}

async function deleteOpportunityHandler(req, res) {
  const { opportunity } = req;
  try {
    await deleteOpportunity(opportunity.id);
    res.status(204).end();
  } catch (err) {
    logger.error('Failed to delete opportunity', { error: err.message, opportunityId: opportunity.id });
    res.status(500).json({ error: 'Failed to delete opportunity' });
  }
}

async function getOpportunityDashboardHandler(req, res) {
  const organizationId = req.user?.username;
  try {
    const dashboard = await getDashboard(organizationId);
    res.json(dashboard);
  } catch (err) {
    logger.error('Failed to fetch opportunity dashboard', { error: err.message, organizationId });
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
}

module.exports = {
  listOpportunitiesHandler,
  createOpportunityHandler,
  getOpportunityHandler,
  updateOpportunityHandler,
  deleteOpportunityHandler,
  getOpportunityDashboardHandler,
};
