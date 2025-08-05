-- Machine Learning models table
CREATE TABLE IF NOT EXISTS ml_models (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  version VARCHAR(100),
  last_trained TIMESTAMP,
  metrics JSONB
);

-- Model updates referencing training data
CREATE TABLE IF NOT EXISTS model_updates (
  id SERIAL PRIMARY KEY,
  model_id INTEGER NOT NULL REFERENCES ml_models(id) ON DELETE CASCADE,
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Model performance evaluations
CREATE TABLE IF NOT EXISTS model_performance (
  id SERIAL PRIMARY KEY,
  model_id INTEGER NOT NULL REFERENCES ml_models(id) ON DELETE CASCADE,
  accuracy NUMERIC,
  precision NUMERIC,
  recall NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trend analytics metrics
CREATE TABLE IF NOT EXISTS trend_metrics (
  id SERIAL PRIMARY KEY,
  metric VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL,
  value NUMERIC NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
