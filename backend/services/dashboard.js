const { findAffiliateById, saveReport } = require('../models/dashboard');
const contractModel = require('../models/contract');

async function getAffiliateDashboard(affiliateId) {
  const affiliate = findAffiliateById(affiliateId);
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  console.info(`Fetched dashboard for affiliate ${affiliateId}`);
  return {
    affiliateId: affiliate.id,
    performance: affiliate.performance,
    earnings: affiliate.earnings,
    referrals: affiliate.referrals
  };
}

async function generateAffiliateReport(affiliateId, startDate, endDate) {
  const affiliate = findAffiliateById(affiliateId);
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  console.info(`Generating report for affiliate ${affiliateId} from ${startDate} to ${endDate}`);
  const report = {
    id: Date.now(),
    affiliateId,
    startDate,
    endDate,
    totalClicks: affiliate.performance.clicks,
    totalConversions: affiliate.performance.conversions,
    totalEarnings: affiliate.earnings,
    generatedAt: new Date().toISOString()
  };
  saveReport(report);
  console.info(`Report ${report.id} generated for affiliate ${affiliateId}`);
  return report;
}

module.exports = {
  getAffiliateDashboard,
  generateAffiliateReport,
  getClientDashboard,
  getFreelancerDashboard,
};

function getClientDashboard(userId) {
  const contracts = contractModel.getByClient(userId);
  const activeContracts = contracts.filter((c) => c.status === 'active').length;
  const pendingProposals = contracts.reduce(
    (count, c) => count + contractModel.getProposals(c.id).filter((p) => p.status === 'pending').length,
    0
  );
  const totalSpend = contracts.reduce((sum, c) => sum + (c.budget || 0), 0);
  return { activeContracts, pendingProposals, totalSpend };
}

function getFreelancerDashboard(userId) {
  const contracts = contractModel.getByFreelancer(userId);
  const activeContracts = contracts.filter((c) => c.status === 'active').length;
  const pendingProposals = contractModel.listAll().reduce(
    (count, c) =>
      count +
      contractModel
        .getProposals(c.id)
        .filter((p) => p.freelancerId === userId && p.status === 'pending').length,
    0
  );
  const totalEarnings = contracts
    .filter((c) => c.status === 'completed')
    .reduce((sum, c) => sum + (c.budget || 0), 0);
  return { activeContracts, pendingProposals, totalEarnings };
}
