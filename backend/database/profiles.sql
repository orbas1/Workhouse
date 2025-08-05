CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  role VARCHAR(10) NOT NULL CHECK (role IN ('mentor','mentee')),
  bio TEXT,
  preferences JSONB,
  skills TEXT[],
  portfolio JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
