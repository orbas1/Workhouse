CREATE TABLE network_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL,
  industry VARCHAR(100),
  location VARCHAR(100),
  funding_stage VARCHAR(50),
  mentorship_focus VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
