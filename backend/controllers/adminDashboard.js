const { countUsers } = require('../models/user');
const supportTickets = require('../models/supportTicket');
const disputes = require('../models/dispute');
const flaggedContent = require('../models/flaggedContent');

/**
 * Provide high level site metrics for the admin dashboard.
 * Requires prior authentication and role-based authorization in route middleware.
 */
async function adminDashboardHandler(req, res) {
  const overview = {
    activeUsers: await countUsers(),
    flaggedContent: flaggedContent.listFlags('pending').length,
    openTickets: supportTickets
      .findAll()
      .filter((t) => t.status !== 'resolved').length,
    activeDisputes: disputes
      .findAll()
      .filter((d) => d.status !== 'resolved').length,
  };
  res.json(overview);
}

module.exports = { adminDashboardHandler };
