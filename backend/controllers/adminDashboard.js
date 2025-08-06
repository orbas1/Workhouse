const { users } = require('../models/user');
const { listJobs } = require('../models/job');
const { searchGigs } = require('../models/gig');
const { listAll: listContracts } = require('../models/contract');

/**
 * Provide high level site metrics for the admin dashboard.
 * Requires prior authentication and admin role enforcement in route middleware.
 */
function adminDashboardHandler(req, res) {
  const overview = {
    totalUsers: users.length,
    totalJobs: listJobs().length,
    totalGigs: searchGigs({}).length,
    totalContracts: listContracts().length,
  };
  res.json(overview);
}

module.exports = { adminDashboardHandler };
