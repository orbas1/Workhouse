const fs = require('fs');
const path = require('path');

describe('n8n route', () => {
  test('defines setup endpoint', () => {
    const filePath = path.join(__dirname, '../routes/n8n.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/router\.post\('\/setup'/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });
});
