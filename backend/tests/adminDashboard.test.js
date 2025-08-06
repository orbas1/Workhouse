const fs = require('fs');
const path = require('path');
const { adminDashboardHandler } = require('../controllers/adminDashboard');
const { users, addUser } = require('../models/user');
const { createJob } = require('../models/job');
const { createGig } = require('../models/gig');
const { createContract } = require('../models/contract');

describe('admin dashboard', () => {
  test('route defines an Express router', () => {
    const filePath = path.join(__dirname, '../routes/adminDashboard.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });

  test('adminDashboardHandler returns site metrics', () => {
    users.length = 0;
    addUser({ username: 'a', password: 'p', role: 'admin' });
    createJob('agency', { title: 'Job test' });
    createGig({ title: 'Gig', description: '', category: 'cat', price: 5, ownerId: 'owner' });
    createContract({ clientId: 'c1', title: 'Contract', description: '', paymentType: 'fixed', budget: 1, hourlyRate: null, expectedHours: null, milestones: [], deliverables: [], timeline: null });

    const req = {};
    const res = { json: jest.fn() };
    adminDashboardHandler(req, res);
    const payload = res.json.mock.calls[0][0];
    expect(payload.totalUsers).toBeGreaterThanOrEqual(1);
    expect(payload.totalJobs).toBeGreaterThanOrEqual(1);
    expect(payload.totalGigs).toBeGreaterThanOrEqual(1);
    expect(payload.totalContracts).toBeGreaterThanOrEqual(1);
  });
});
