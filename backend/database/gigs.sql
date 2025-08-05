-- SQL schema for gigs
CREATE TABLE gigs (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  price NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
