-- Stores feedback submitted by volunteers about opportunities or organizations
CREATE TABLE IF NOT EXISTS volunteer_feedback (
  id UUID PRIMARY KEY,
  volunteer_id UUID NOT NULL,
  opportunity_id UUID NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores feedback submitted by organizations about volunteers
CREATE TABLE IF NOT EXISTS organization_feedback (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL,
  volunteer_id UUID NOT NULL,
  opportunity_id UUID NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
