const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const bcrypt = require('bcryptjs');

function escape(str) {
  return str.replace(/'/g, "''");
}

async function seedProducts() {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataPath)) return;
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const p of products) {
    const query = `INSERT INTO products (id, name, description, price, image) VALUES ('${escape(p.id)}', '${escape(p.name)}', '${escape(p.description)}', ${p.price}, '${escape(p.image)}') ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, image = EXCLUDED.image;`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Seeded products');
}

async function seedUsers() {
  const dataPath = path.join(__dirname, '..', 'data', 'users.json');
  if (!fs.existsSync(dataPath)) return;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const u of users) {
    const hash = bcrypt.hashSync(u.password, 10);
    const query = `INSERT INTO users (id, username, password_hash, role, full_name, email, phone, location, bio, expertise) VALUES ('${escape(u.id)}', '${escape(u.username)}', '${hash}', '${escape(u.role)}', '${escape(u.full_name)}', '${escape(u.email)}', '${escape(u.phone)}', '${escape(u.location)}', '${escape(u.bio)}', '${escape(u.expertise)}') ON CONFLICT (id) DO UPDATE SET username = EXCLUDED.username, password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, full_name = EXCLUDED.full_name, email = EXCLUDED.email, phone = EXCLUDED.phone, location = EXCLUDED.location, bio = EXCLUDED.bio, expertise = EXCLUDED.expertise;`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Seeded users');
}

async function seedProfiles() {
  const dataPath = path.join(__dirname, '..', 'data', 'profiles.json');
  if (!fs.existsSync(dataPath)) return;
  const profiles = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const dbName = process.env.DB_NAME || 'workhouse';

  for (const p of profiles) {
    const contact = escape(JSON.stringify(p.contact || {}));
    const preferences = escape(JSON.stringify(p.preferences || {}));
    const portfolio = escape(JSON.stringify(p.portfolio || {}));
    const visibility = escape(JSON.stringify(p.visibility || {}));
    const theme = escape(JSON.stringify(p.theme || {}));
    const skills = `ARRAY[${(p.skills || []).map(s => `'${escape(s)}'`).join(',')}]`;
    const query = `INSERT INTO profiles (id, user_id, role, full_name, title, location, avatar_url, bio, contact, preferences, skills, portfolio, visibility, theme)
      VALUES ('${escape(p.id)}', '${escape(p.user_id)}', '${escape(p.role)}', '${escape(p.full_name)}', '${escape(p.title)}', '${escape(p.location)}', '${escape(p.avatar_url)}', '${escape(p.bio)}', '${contact}'::jsonb, '${preferences}'::jsonb, ${skills}, '${portfolio}'::jsonb, '${visibility}'::jsonb, '${theme}'::jsonb)
      ON CONFLICT (id) DO UPDATE SET user_id = EXCLUDED.user_id, role = EXCLUDED.role, full_name = EXCLUDED.full_name, title = EXCLUDED.title, location = EXCLUDED.location, avatar_url = EXCLUDED.avatar_url, bio = EXCLUDED.bio, contact = EXCLUDED.contact, preferences = EXCLUDED.preferences, skills = EXCLUDED.skills, portfolio = EXCLUDED.portfolio, visibility = EXCLUDED.visibility, theme = EXCLUDED.theme;`;
    execSync(`echo "${query}" | sudo -u postgres psql -d ${dbName}`, { stdio: 'inherit' });
  }
  console.log('Seeded profiles');
}

async function run() {
  await seedUsers();
  await seedProducts();
  await seedProfiles();
}

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
