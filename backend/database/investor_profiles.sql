CREATE TABLE investor_profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  bio TEXT,
  portfolio JSONB,
  analytics JSONB,
  verification_status VARCHAR(20) DEFAULT 'unverified',
  continuous_verification BOOLEAN DEFAULT FALSE,
  geographic_preferences JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
