const fs = require('fs');
const path = require('path');

describe('billing routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/billing.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
    expect(content).toMatch(/\/transactions\/:transactionId\/invoice/);
  });
});
