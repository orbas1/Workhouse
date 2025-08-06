const { getSimStats } = require('../models/simDashboard');

async function fetchSimDashboard() {
  return getSimStats();
}

module.exports = { fetchSimDashboard };
