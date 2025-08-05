CREATE TABLE IF NOT EXISTS path_analytics (
  id UUID PRIMARY KEY,
  path_id VARCHAR(255) NOT NULL,
  views INT DEFAULT 0,
  enrollments INT DEFAULT 0,
  completions INT DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  paths_enrolled INT DEFAULT 0,
  paths_completed INT DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  learning_hours INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skill_analytics (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  skill VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  progress INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_predictions (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prediction TEXT NOT NULL,
  confidence DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

