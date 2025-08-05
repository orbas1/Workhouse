-- Live Feed Module Tables

CREATE TABLE IF NOT EXISTS live_feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live_feed_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  start_time TIMESTAMP NOT NULL
);
