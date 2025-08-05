-- SQL schema for Participant Management module

CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  profile JSONB,
  preferences JSONB,
  status VARCHAR(50) DEFAULT 'registered',
  payment_amount NUMERIC,
  payment_method VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_waitlists (
  event_id INTEGER NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (event_id, user_id)
);

