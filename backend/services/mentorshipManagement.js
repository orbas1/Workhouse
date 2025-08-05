const mentorshipModel = require('../models/mentorshipManagement');
const logger = require('../utils/logger');

async function getOverview() {
  const initiatives = mentorshipModel.getInitiatives();
  const total = initiatives.length;
  const active = initiatives.filter(i => i.status === 'active').length;
  logger.info('Mentorship program overview retrieved', { totalInitiatives: total, activeInitiatives: active });
  return { totalInitiatives: total, activeInitiatives: active };
}

async function createInitiative(data) {
  const initiative = mentorshipModel.createInitiative(data);
  logger.info('Mentorship initiative created', { id: initiative.id, title: initiative.title });
  return initiative;
}

async function generateEfficacyReport() {
  const initiatives = mentorshipModel.getInitiatives();
  const total = initiatives.length;
  const completed = initiatives.filter(i => i.status === 'completed').length;
  const active = initiatives.filter(i => i.status === 'active').length;
  const completionRate = total ? completed / total : 0;
  logger.info('Mentorship program efficacy report generated', { total, completed, active });
  return { totalInitiatives: total, activeInitiatives: active, completedInitiatives: completed, completionRate };
}

module.exports = {
  getOverview,
  createInitiative,
  generateEfficacyReport,
};
