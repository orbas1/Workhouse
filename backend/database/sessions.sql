CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER NOT NULL,
  mentee_id INTEGER NOT NULL,
  scheduled_for TIMESTAMP NOT NULL,
  agenda TEXT,
  notes TEXT,
  materials TEXT,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
