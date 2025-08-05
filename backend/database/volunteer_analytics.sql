CREATE TABLE IF NOT EXISTS volunteer_engagement (
  id UUID PRIMARY KEY,
  volunteer_id VARCHAR(255) NOT NULL,
  engagement_date DATE NOT NULL,
  hours INT DEFAULT 0,
  tasks_completed INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organization_project_analytics (
  id UUID PRIMARY KEY,
  organization_id VARCHAR(255) NOT NULL,
  project_id VARCHAR(255) NOT NULL,
  analytics_date DATE NOT NULL,
  volunteers INT DEFAULT 0,
  impact_score DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
