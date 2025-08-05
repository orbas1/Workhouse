-- SQL schema for webinar analytics and user behavior analytics

CREATE TABLE IF NOT EXISTS webinar_analytics (
  id UUID PRIMARY KEY,
  webinar_id UUID NOT NULL,
  overview JSONB,
  engagement JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webinar_analytics_webinar_id ON webinar_analytics (webinar_id);

CREATE TABLE IF NOT EXISTS user_behavior_analytics (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  analytics JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_behavior_user_id ON user_behavior_analytics (user_id);
