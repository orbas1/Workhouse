CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  participants TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE message_templates (
  id VARCHAR(50) PRIMARY KEY,
  content TEXT NOT NULL
);

CREATE TABLE meetings (
  id UUID PRIMARY KEY,
  participants TEXT[] NOT NULL,
  scheduled_for TIMESTAMP NOT NULL,
  topic VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calls (
  id UUID PRIMARY KEY,
  participants TEXT[] NOT NULL,
  scheduled_for TIMESTAMP NOT NULL,
  topic VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
