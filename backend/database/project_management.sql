CREATE TABLE workspace_projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_tasks (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  location VARCHAR(255),
  budget NUMERIC(12,2),
  due_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  assignee VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_employees (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  hired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_feeds (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_gantt_charts (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_calendar_events (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_budget_entries (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_objective_entries (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  objective TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_reports (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_files (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_workflows (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  steps JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_text_documents (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES workspace_projects(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
