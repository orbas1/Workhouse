-- Tables for integrating external data and custom analytics reports

CREATE TABLE IF NOT EXISTS external_data_sources (
  id SERIAL PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL,
  source_name VARCHAR(255) NOT NULL,
  config JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS custom_analytics_reports (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  metrics JSONB NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
