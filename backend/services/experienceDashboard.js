const Opportunity = require('../models/opportunity');
const Participant = require('../models/participant');
const logger = require('../utils/logger');

/**
 * Aggregate dashboard data for Experience Launchpad.
 * @param {Object} user - Authenticated user payload.
 * @returns {Object} Dashboard metrics, notifications and recommendations.
 */
function getDashboardData(user = {}) {
  const role = user.role || 'participant';
  const opportunities = Opportunity.list();
  let quickStats = {};

  if (role === 'provider') {
    const myOpps = opportunities.filter(o => o.organizationId === user.id);
    quickStats = {
      activeOpportunities: myOpps.length,
      totalApplications: myOpps.reduce((sum, o) => sum + (o.applications || 0), 0),
      completedOpportunities: myOpps.filter(o => o.status === 'completed').length,
    };
  } else {
    const participant = Participant.findByUser(user.id);
    quickStats = {
      projectsCompleted: participant?.profile?.projectsCompleted || 0,
      skillsAcquired: participant?.profile?.skills?.length || 0,
      newOpportunities: opportunities.length,
    };
  }

  const recommendations = opportunities.slice(0, 3).map(o => ({
    id: o.id,
    title: o.title,
    description: o.description,
  }));

  logger.info('Experience dashboard data compiled', { userId: user.id, role });

  return {
    quickStats,
    notifications: [],
    recommendations,
  };
}

module.exports = { getDashboardData };
