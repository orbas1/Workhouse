CREATE TABLE training_resources (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE training_resource_reviews (
  id UUID PRIMARY KEY,
  resource_id UUID REFERENCES training_resources(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE training_completions (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  resource_id UUID REFERENCES training_resources(id) ON DELETE SET NULL,
  certification_name VARCHAR(255) NOT NULL,
  provider VARCHAR(255),
  external_id VARCHAR(255),
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
