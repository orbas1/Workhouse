const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUser, addUser } = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

async function register(username, password, role = 'user') {
  const existing = findUser(username);
  if (existing) {
    throw new Error('User already exists');
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { username, password: hashed, role };
  addUser(user);
  return { username, role };
}

async function login(username, password) {
  const user = findUser(username);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ username, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return { token };
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { register, login, verifyToken };
