-- SQL schema for payouts
CREATE TABLE IF NOT EXISTS payouts (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  initiated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL
);
