const affiliates = [
  {
    id: 1,
    name: 'Affiliate One',
    performance: { clicks: 1200, conversions: 150 },
    earnings: 7500,
    referrals: 80
  }
];

const reports = [];

function findAffiliateById(id) {
  return affiliates.find(a => a.id === id);
}

function saveReport(report) {
  reports.push(report);
}

module.exports = {
  affiliates,
  reports,
  findAffiliateById,
  saveReport
};
