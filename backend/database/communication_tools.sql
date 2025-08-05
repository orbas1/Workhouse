-- Tables for communication tools
CREATE TABLE IF NOT EXISTS communication_sessions (
  id UUID PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  language VARCHAR(10),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_exchanges (
  id UUID PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  contact_info TEXT NOT NULL,
  exchanged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS communication_history (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  action VARCHAR(50) NOT NULL,
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
