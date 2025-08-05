CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY,
  organization_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  remote BOOLEAN DEFAULT FALSE,
  commitment_time VARCHAR(100),
  urgency VARCHAR(50),
  requirements TEXT,
  multimedia JSONB,
  views INTEGER DEFAULT 0,
  applications INTEGER DEFAULT 0,
  matches INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
