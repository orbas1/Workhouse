const { getSimDashboard } = require('../models/simDashboard');

async function fetchSimDashboard() {
  return getSimDashboard();
}

module.exports = { fetchSimDashboard };
