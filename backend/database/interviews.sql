-- SQL schema for interviews
CREATE TABLE IF NOT EXISTS interviews (
  id UUID PRIMARY KEY,
  employer_id UUID NOT NULL,
  candidate_email TEXT NOT NULL,
  scheduled_for TIMESTAMP NOT NULL,
  meeting_link TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  notes JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
