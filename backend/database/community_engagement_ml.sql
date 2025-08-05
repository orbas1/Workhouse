CREATE TABLE IF NOT EXISTS community_engagement_scores (
  id UUID PRIMARY KEY,
  community_id UUID NOT NULL,
  user_id UUID NOT NULL,
  score NUMERIC NOT NULL,
  calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS community_questions (
  id UUID PRIMARY KEY,
  community_id UUID NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
