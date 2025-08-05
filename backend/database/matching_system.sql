CREATE TABLE IF NOT EXISTS matching_preferences (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  interests TEXT[],
  goals TEXT[],
  availability VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matching_sessions (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL,
  participant_a UUID NOT NULL,
  participant_b UUID NOT NULL,
  duration_minutes NUMERIC(3,1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matching_feedback (
  id SERIAL PRIMARY KEY,
  match_id UUID NOT NULL,
  user_id UUID NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

