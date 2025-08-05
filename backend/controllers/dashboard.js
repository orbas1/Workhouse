const { getAffiliateDashboard, generateAffiliateReport } = require('../services/dashboard');

async function dashboardHandler(req, res) {
  const { affiliateId } = req.params;
  try {
    const data = await getAffiliateDashboard(parseInt(affiliateId, 10));
    res.json(data);
  } catch (err) {
    console.error('Dashboard retrieval failed', err);
    res.status(404).json({ error: err.message });
  }
}

async function reportGenerationHandler(req, res) {
  const { affiliateId, startDate, endDate } = req.body;
  try {
    const report = await generateAffiliateReport(parseInt(affiliateId, 10), startDate, endDate);
    res.status(201).json(report);
  } catch (err) {
    console.error('Report generation failed', err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { dashboardHandler, reportGenerationHandler };
