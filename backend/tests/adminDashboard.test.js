const fs = require('fs');
const path = require('path');
const { adminDashboardHandler } = require('../controllers/adminDashboard');
const { clearUsers, addUser } = require('../models/user');
const supportTickets = require('../models/supportTicket');
const disputes = require('../models/dispute');
const flaggedContent = require('../models/flaggedContent');

describe('admin dashboard', () => {
  test('route defines an Express router', () => {
    const filePath = path.join(__dirname, '../routes/adminDashboard.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });

  test('adminDashboardHandler returns site metrics', async () => {
    await clearUsers();
    await addUser({ username: 'a', password: 'p', role: 'admin' });
    supportTickets.createTicket({ userId: 'a', subject: 's', message: 'm' });
    flaggedContent.flagContent({ contentId: '1', reporterId: 'a', reason: 'spam' });
    disputes.createDispute({ userId: 'a', disputeeId: 'b', category: 'test' });

    const req = {};
    const res = { json: jest.fn() };
    await adminDashboardHandler(req, res);
    const payload = res.json.mock.calls[0][0];
    expect(payload.activeUsers).toBeGreaterThanOrEqual(1);
    expect(payload.flaggedContent).toBeGreaterThanOrEqual(1);
    expect(payload.openTickets).toBeGreaterThanOrEqual(1);
    expect(payload.activeDisputes).toBeGreaterThanOrEqual(1);
  });
});
