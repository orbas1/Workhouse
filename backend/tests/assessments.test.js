const fs = require('fs');
const path = require('path');

describe('assessments routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/assessments.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});
