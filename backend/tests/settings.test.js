const fs = require('fs');
const path = require('path');

describe('settings routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/settings.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});
