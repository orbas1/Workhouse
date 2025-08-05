-- SQL schema for interviews
CREATE TABLE IF NOT EXISTS interviews (
  id UUID PRIMARY KEY,
  application_id UUID NOT NULL,
  employer_id UUID NOT NULL,
  applicant_id UUID NOT NULL,
  interview_date TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
