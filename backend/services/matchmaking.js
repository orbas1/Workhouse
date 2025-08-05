const logger = require('../utils/logger');
const matchmakingModel = require('../models/matchmaking');

async function matchJobs(agencyId, options = {}) {
  const { jobs, criteria } = options;
  let currentCriteria = matchmakingModel.getCriteria(agencyId);
  if (criteria) {
    currentCriteria = matchmakingModel.setCriteria(agencyId, criteria);
  }

  const allJobs = matchmakingModel.getJobsByAgency(agencyId);
  const targetJobs = jobs?.length ? allJobs.filter((j) => jobs.includes(j.id)) : allJobs;
  const employees = matchmakingModel.getEmployeesByAgency(agencyId);
  const matches = [];

  for (const job of targetJobs) {
    let bestEmployee = null;
    let bestScore = 0;
    for (const emp of employees) {
      const skillMatch = job.requiredSkills?.length
        ? job.requiredSkills.filter((s) => emp.skills.includes(s)).length / job.requiredSkills.length
        : 0;
      const availabilityScore = emp.availability ? 1 : 0;
      const performanceScore = emp.pastPerformance ?? 0;
      const totalScore =
        skillMatch * currentCriteria.skillsWeight +
        availabilityScore * currentCriteria.availabilityWeight +
        performanceScore * currentCriteria.performanceWeight;
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestEmployee = emp;
      }
    }
    if (bestEmployee) {
      const match = matchmakingModel.saveMatch({
        agencyId,
        jobId: job.id,
        employeeId: bestEmployee.id,
        matchScore: Number(bestScore.toFixed(2)),
      });
      matches.push(match);
    }
  }

  logger.info('Job matching completed', { agencyId, matches: matches.length });
  return matches;
}

async function getMatchCriteria(agencyId) {
  return matchmakingModel.getCriteria(agencyId);
}

module.exports = {
  matchJobs,
  getMatchCriteria,
};
