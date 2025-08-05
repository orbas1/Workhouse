-- Table structure for storing workspace analytics metrics
CREATE TABLE IF NOT EXISTS workspace_analytics (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  active_users INTEGER DEFAULT 0,
  projects_created INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  messages_exchanged INTEGER DEFAULT 0,
  collaboration_score NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
