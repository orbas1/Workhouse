-- Table for feedback submitted after mentorship sessions
CREATE TABLE IF NOT EXISTS feedback_sessions (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL,
  mentor_id INTEGER NOT NULL,
  mentee_id INTEGER NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Detailed feedback entries tied to sessions
CREATE TABLE IF NOT EXISTS session_feedback_details (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL,
  detail TEXT NOT NULL,
  submitted_by TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rewards issued to mentors based on feedback
CREATE TABLE IF NOT EXISTS mentor_rewards (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER NOT NULL,
  points INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentee goal progress reports
CREATE TABLE IF NOT EXISTS mentee_goal_progress (
  id SERIAL PRIMARY KEY,
  mentee_id INTEGER NOT NULL,
  goal TEXT NOT NULL,
  progress TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
