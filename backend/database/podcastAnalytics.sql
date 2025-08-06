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

CREATE TABLE IF NOT EXISTS podcast_playback_events (
  id SERIAL PRIMARY KEY,
  podcast_id UUID NOT NULL,
  user_id UUID NOT NULL,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_podcast_playback_podcast_id
  ON podcast_playback_events (podcast_id);
