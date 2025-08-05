-- Investor-Entrepreneur Matching tables

CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY,
    investor_id UUID NOT NULL,
    entrepreneur_id UUID NOT NULL,
    stage VARCHAR(50) NOT NULL,
    match_score NUMERIC(5,2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_preferences (
    id UUID PRIMARY KEY,
    profile_id UUID NOT NULL UNIQUE,
    industries JSONB,
    stages JSONB,
    min_investment NUMERIC,
    max_investment NUMERIC,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_feedback (
    id UUID PRIMARY KEY,
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_notification_subscriptions (
    profile_id UUID PRIMARY KEY,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_notifications (
    id UUID PRIMARY KEY,
    profile_id UUID NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
