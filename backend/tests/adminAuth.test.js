const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { adminLoginHandler } = require('../controllers/adminAuth');
const { clearUsers, addUser } = require('../models/user');

describe('admin auth', () => {
  test('route defines an Express router', () => {
    const filePath = path.join(__dirname, '../routes/adminAuth.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
  });

  test('adminLoginHandler authenticates admin user only', async () => {
    await clearUsers();
    const hashed = await bcrypt.hash('secret', 10);
    await addUser({ username: 'admin', password: hashed, role: 'admin' });

    const req = { validatedBody: { username: 'admin', password: 'secret' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await adminLoginHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));

    const nonAdminReq = { validatedBody: { username: 'admin', password: 'wrong' } };
    res.json.mockClear();
    res.status.mockClear();
    await adminLoginHandler(nonAdminReq, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
