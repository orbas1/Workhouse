CREATE TABLE IF NOT EXISTS podcast_analytics (
  id SERIAL PRIMARY KEY,
  podcast_id UUID NOT NULL,
  episode_id UUID,
  series_id UUID,
  owner_id UUID NOT NULL,
  listens INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  donations INTEGER DEFAULT 0,
  average_listen_time INTEGER DEFAULT 0,
  demographics JSONB,
  engagement JSONB,
  collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
