-- Table for storing aggregate affiliate metrics
CREATE TABLE IF NOT EXISTS affiliate_metrics (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER NOT NULL,
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_earnings NUMERIC(12,2) DEFAULT 0,
  referrals INTEGER DEFAULT 0,
  last_updated TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table for reports generated for affiliates
CREATE TABLE IF NOT EXISTS affiliate_reports (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_earnings NUMERIC(12,2) DEFAULT 0,
  generated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
