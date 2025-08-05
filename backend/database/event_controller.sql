-- Event Controller tables for pitch, networking, and workshop events

CREATE TABLE IF NOT EXISTS events_general (
  id UUID PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- pitch, networking, workshop
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  host_id UUID NOT NULL,
  livestream_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_attendees (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events_general(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_questions (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events_general(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  question TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
