
-- Affiliate Onboarding resources and webinar registration tables

CREATE TABLE IF NOT EXISTS affiliate_onboarding_resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS affiliate_webinar_registrations (
  id SERIAL PRIMARY KEY,
  affiliate_id VARCHAR(255) NOT NULL,
  webinar_id INTEGER NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

