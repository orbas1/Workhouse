CREATE TABLE milestones (
  id UUID PRIMARY KEY,
  path_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  reward VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestone_notifications (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
