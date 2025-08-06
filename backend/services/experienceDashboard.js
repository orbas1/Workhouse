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
  let notifications = [];

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

    const prefs = participant?.preferences || {};
    const looking = prefs.looking !== false; // default to true
    const filtered = opportunities.filter(o => {
      if (prefs.field && o.field !== prefs.field) return false;
      if (typeof prefs.isPaid !== 'undefined' && o.isPaid !== prefs.isPaid) return false;
      if (prefs.employmentType && o.employmentType !== prefs.employmentType) return false;
      if (prefs.offering && o.offering !== prefs.offering) return false;
      return true;
    });
    const recommendations = looking ? filtered.slice(0, 3).map(o => ({
      id: o.id,
      title: o.title,
      description: o.description,
    })) : [];

    if (prefs.autoNotify && looking) {
      notifications = recommendations.map(r => ({ message: `New match: ${r.title}` }));
    }

    logger.info('Experience dashboard data compiled', { userId: user.id, role });

    return {
      quickStats,
      notifications,
      recommendations,
    };
  }

  logger.info('Experience dashboard data compiled', { userId: user.id, role });

  const recommendations = opportunities.slice(0, 3).map(o => ({
    id: o.id,
    title: o.title,
    description: o.description,
  }));

  return {
    quickStats,
    notifications,
    recommendations,
  };
}

module.exports = { getDashboardData };
