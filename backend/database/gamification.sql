-- Table for badges
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Junction table for user badges
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboard entries per course
CREATE TABLE IF NOT EXISTS course_leaderboard (
  id UUID PRIMARY KEY,
  course_id UUID NOT NULL,
  user_id UUID NOT NULL,
  points INT NOT NULL DEFAULT 0,
  rank INT
);

-- Available rewards
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  points_required INT NOT NULL
);

-- Claimed rewards
CREATE TABLE IF NOT EXISTS reward_claims (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  reward_id UUID NOT NULL REFERENCES rewards(id),
  claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
