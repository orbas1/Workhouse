const fs = require('fs');
const path = require('path');

describe('financialAnalytics routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/financialAnalytics.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});
