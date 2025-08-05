const opportunityModel = require('../models/opportunity');
const logger = require('../utils/logger');

async function createOpportunity(organizationId, data) {
  const opportunity = opportunityModel.create({ organizationId, ...data });
  logger.info('Opportunity created', { opportunityId: opportunity.id, organizationId });
  return opportunity;
}

async function listOpportunities(filters = {}, { page = 1, limit = 10 } = {}) {
  let results = opportunityModel.list();
  if (filters.location) results = results.filter(o => o.location === filters.location);
  if (typeof filters.remote !== 'undefined') {
    const remote = filters.remote === 'true' || filters.remote === true;
    results = results.filter(o => o.remote === remote);
  }
  if (filters.commitmentTime) results = results.filter(o => o.commitmentTime === filters.commitmentTime);
  if (filters.urgency) results = results.filter(o => o.urgency === filters.urgency);
  if (filters.category) results = results.filter(o => o.category === filters.category);
  if (filters.duration) results = results.filter(o => o.duration === filters.duration);
  if (filters.experienceLevel) results = results.filter(o => o.experienceLevel === filters.experienceLevel);
  if (filters.status) results = results.filter(o => o.status === filters.status);
  if (filters.keyword) {
    const kw = String(filters.keyword).toLowerCase();
    results = results.filter(o =>
      o.title.toLowerCase().includes(kw) ||
      o.description.toLowerCase().includes(kw)
    );
  }
  if (filters.compensationMin)
    results = results.filter(o => o.compensation >= Number(filters.compensationMin));
  if (filters.compensationMax)
    results = results.filter(o => o.compensation <= Number(filters.compensationMax));
  const total = results.length;
  const start = (page - 1) * limit;
  const opportunities = results.slice(start, start + limit);
  return { total, page, limit, opportunities };
}

async function getOpportunity(id) {
  return opportunityModel.findById(id);
}

async function recordView(id) {
  return opportunityModel.incrementView(id);
}

async function updateOpportunity(id, updates) {
  const updated = opportunityModel.update(id, updates);
  if (updated) {
    logger.info('Opportunity updated', { opportunityId: id });
    logger.info('Notifications sent to interested volunteers', { opportunityId: id });
  }
  return updated;
}

async function deleteOpportunity(id) {
  opportunityModel.softDelete(id);
  logger.info('Opportunity soft deleted', { opportunityId: id });
}

async function getDashboard(organizationId) {
  const ops = opportunityModel.list().filter(o => o.organizationId === organizationId);
  const stats = {
    totalViews: ops.reduce((sum, o) => sum + o.views, 0),
    totalApplications: ops.reduce((sum, o) => sum + o.applications, 0),
    totalMatches: ops.reduce((sum, o) => sum + o.matches, 0),
  };
  return { opportunities: ops, stats };
}

module.exports = {
  createOpportunity,
  listOpportunities,
  getOpportunity,
  recordView,
  updateOpportunity,
  deleteOpportunity,
  getDashboard,
};
