-- SQL schema for storing podcasts and webinars in a unified library
CREATE TABLE IF NOT EXISTS content_library (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  scheduled_at TIMESTAMP
);
