-- Table to store individual sentiment analysis records
CREATE TABLE IF NOT EXISTS sentiment_analysis_records (
  id UUID PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  score INTEGER NOT NULL,
  label VARCHAR(20) NOT NULL,
  emotions JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store feedback used for training and model improvement
CREATE TABLE IF NOT EXISTS sentiment_feedback (
  id UUID PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  label VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to keep track of sentiment model metadata
CREATE TABLE IF NOT EXISTS sentiment_model_info (
  version VARCHAR(50) NOT NULL,
  last_trained TIMESTAMP,
  training_samples INTEGER DEFAULT 0
);
