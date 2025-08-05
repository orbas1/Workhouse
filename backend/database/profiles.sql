CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  role VARCHAR(10) NOT NULL CHECK (role IN ('mentor','mentee')),
  full_name TEXT,
  title TEXT,
  location TEXT,
  avatar_url TEXT,
  bio TEXT,
  contact JSONB,
  preferences JSONB,
  skills TEXT[],
  portfolio JSONB,
  visibility JSONB,
  theme JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
