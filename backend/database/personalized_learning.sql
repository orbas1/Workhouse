CREATE TABLE IF NOT EXISTS personalized_learning_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  level VARCHAR(50) NOT NULL,
  topics TEXT,
  last_assessment_score INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessment_results (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  assessment_id VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  feedback TEXT,
  evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
