const logger = require('../utils/logger');
const disputeModel = require('../models/dispute');

async function getAllAnalytics() {
  const disputes = disputeModel.findAll();
  const total = disputes.length;
  const resolved = disputes.filter(d => d.status === 'resolved').length;
  const open = total - resolved;
  logger.info('Fetched analytics for all disputes', { total, resolved, open });
  return { total, resolved, open };
}

async function getAnalyticsByCategory(category) {
  const disputes = disputeModel.findAll();
  const grouped = {};
  disputes.forEach(d => {
    if (!grouped[d.category]) {
      grouped[d.category] = { total: 0, resolved: 0, open: 0 };
    }
    grouped[d.category].total += 1;
    if (d.status === 'resolved') grouped[d.category].resolved += 1;
    else grouped[d.category].open += 1;
  });

  logger.info('Fetched analytics by category', { category: category || 'all' });
  if (category) {
    return grouped[category] || { total: 0, resolved: 0, open: 0 };
  }
  return grouped;
}

async function getAnalyticsById(disputeId) {
  const dispute = disputeModel.findById(disputeId);
  if (!dispute) {
    throw new Error('Dispute not found');
  }
  const resolutionTime = dispute.resolvedAt
    ? Math.round((dispute.resolvedAt - dispute.createdAt) / 1000)
    : null;
  logger.info('Fetched analytics for dispute', { disputeId });
  return { ...dispute, resolutionTime };
}

module.exports = {
  getAllAnalytics,
  getAnalyticsByCategory,
  getAnalyticsById,
};
