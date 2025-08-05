CREATE TABLE IF NOT EXISTS expert_sessions (
  id UUID PRIMARY KEY,
  expert_id UUID NOT NULL,
  user_id UUID NOT NULL,
  session_date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expert_webinars (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expert_advice_requests (
  id UUID PRIMARY KEY,
  expert_id UUID NOT NULL,
  user_id UUID NOT NULL,
  topic VARCHAR(255) NOT NULL,
  details TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expert_project_feedback (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL,
  expert_id UUID NOT NULL,
  user_id UUID NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
