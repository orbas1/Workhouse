-- Stores aggregated volunteering dashboard metrics for users
CREATE TABLE IF NOT EXISTS volunteering_stats (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  total_hours INT DEFAULT 0,
  active_applications INT DEFAULT 0,
  feedback_score NUMERIC(3,2) DEFAULT 0,
  total_volunteers INT DEFAULT 0,
  active_opportunities INT DEFAULT 0,
  pending_applications INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

