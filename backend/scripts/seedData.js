require('../config/env');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

function getClient() {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    return new Client({ connectionString });
  }

  const database = process.env.DB_NAME || 'workhouse';
  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD || '';
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

  if (!user) {
    throw new Error('DB_USER is not defined in environment');
  }

  return new Client({ host, user, password, port, database });
}

async function seedProducts(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'products.json');
  if (!fs.existsSync(dataPath)) return;
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const p of products) {
    await client.query(
      `INSERT INTO products (id, name, description, price, image)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE
         SET name = EXCLUDED.name,
             description = EXCLUDED.description,
             price = EXCLUDED.price,
             image = EXCLUDED.image`,
      [p.id, p.name, p.description, p.price, p.image]
    );
  }
  console.log('Seeded products');
}

async function seedUsers(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'users.json');
  if (!fs.existsSync(dataPath)) return;
  const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const VALID_ROLES = ['super_admin', 'admin', 'support', 'professional', 'user'];

  for (const u of users) {
    const hash = bcrypt.hashSync(u.password, 10);
    const role = VALID_ROLES.includes(u.role) ? u.role : 'user';
    await client.query(
      `INSERT INTO users (id, username, password_hash, role, full_name, email, phone, location, bio, expertise)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET
         username = EXCLUDED.username,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role,
         full_name = EXCLUDED.full_name,
         email = EXCLUDED.email,
         phone = EXCLUDED.phone,
         location = EXCLUDED.location,
         bio = EXCLUDED.bio,
         expertise = EXCLUDED.expertise`,
      [
        u.id,
        u.username,
        hash,
        role,
        u.full_name,
        u.email,
        u.phone,
        u.location,
        u.bio,
        u.expertise,
      ]
    );
  }
  console.log('Seeded users');
}

async function seedProfiles(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'profiles.json');
  if (!fs.existsSync(dataPath)) return;
  const profiles = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const p of profiles) {
    await client.query(
      `INSERT INTO profiles (id, user_id, role, full_name, title, location, avatar_url, bio,
                             contact, preferences, skills, portfolio, visibility, theme)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8,
               $9::jsonb, $10::jsonb, $11::text[], $12::jsonb, $13::jsonb, $14::jsonb)
       ON CONFLICT (id) DO UPDATE SET
         user_id = EXCLUDED.user_id,
         role = EXCLUDED.role,
         full_name = EXCLUDED.full_name,
         title = EXCLUDED.title,
         location = EXCLUDED.location,
         avatar_url = EXCLUDED.avatar_url,
         bio = EXCLUDED.bio,
         contact = EXCLUDED.contact,
         preferences = EXCLUDED.preferences,
         skills = EXCLUDED.skills,
         portfolio = EXCLUDED.portfolio,
         visibility = EXCLUDED.visibility,
         theme = EXCLUDED.theme`,
      [
        p.id,
        p.user_id,
        p.role,
        p.full_name,
        p.title,
        p.location,
        p.avatar_url,
        p.bio,
        JSON.stringify(p.contact || {}),
        JSON.stringify(p.preferences || {}),
        p.skills || [],
        JSON.stringify(p.portfolio || {}),
        JSON.stringify(p.visibility || {}),
        JSON.stringify(p.theme || {}),
      ]
    );
  }
  console.log('Seeded profiles');
}

async function seedLiveFeedPosts(client) {
  const dataPath = path.join(__dirname, '..', 'data', 'liveFeedPosts.json');
  if (!fs.existsSync(dataPath)) return;
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  for (const p of posts) {
    await client.query(
      `INSERT INTO live_feed_posts (id, author, content, category, created_at, likes)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
         author = EXCLUDED.author,
         content = EXCLUDED.content,
         category = EXCLUDED.category,
         created_at = EXCLUDED.created_at,
         likes = EXCLUDED.likes`,
      [
        p.id,
        p.author,
        p.content,
        p.category,
        p.createdAt ? new Date(p.createdAt) : new Date(),
        p.likes || 0,
      ]
    );
  }
  console.log('Seeded live feed posts');
}

async function run() {
  const client = getClient();
  await client.connect();
  try {
    await client.query('BEGIN');
    await seedUsers(client);
    await seedProducts(client);
    await seedProfiles(client);
    await seedLiveFeedPosts(client);
    await client.query('COMMIT');
    console.log('Seeding complete');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    await client.end();
  }
}

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
