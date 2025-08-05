CREATE TABLE learning_paths (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  courses JSONB,
  rating INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_path_shares (
  id UUID PRIMARY KEY,
  path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
  shared_with VARCHAR(255) NOT NULL,
  shared_by VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
