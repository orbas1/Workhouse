const { findAffiliateById, saveReport } = require('../models/dashboard');

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
  generateAffiliateReport
};
