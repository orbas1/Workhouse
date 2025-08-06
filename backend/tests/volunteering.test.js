const fs = require('fs');
const path = require('path');
const analyticsModel = require('../models/analytics');
const { getVolunteerStats } = require('../services/volunteering');

describe('volunteering routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/volunteering.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});

describe('volunteering stats service', () => {
  test('includes engagement history in volunteer stats', () => {
    analyticsModel.addVolunteerEngagement('user-test', 4, 2, new Date('2024-01-01'));
    const stats = getVolunteerStats('user-test');
    expect(stats.totalHours).toBe(4);
    expect(Array.isArray(stats.engagementHistory)).toBe(true);
    expect(stats.engagementHistory.length).toBeGreaterThan(0);
  });
});
