const { getOverview } = require('../services/stats');

async function getOverviewHandler(req, res) {
  try {
    const data = await getOverview();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getOverviewHandler };
