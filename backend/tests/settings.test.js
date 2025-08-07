const fs = require('fs');
const path = require('path');
const { getSettingsByUserId } = require('../models/settings');

describe('settings routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/settings.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});

describe('default account level', () => {
  test('new users are upgraded to enterprise', () => {
    const settings = getSettingsByUserId('test-user');
    expect(settings.accountLevel).toBe('enterprise');
  });
});
