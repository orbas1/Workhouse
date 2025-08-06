const fs = require('fs');
const path = require('path');

describe('resources routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/resources.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});
