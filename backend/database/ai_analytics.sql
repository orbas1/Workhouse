-- AI Analytics Module Tables

CREATE TABLE IF NOT EXISTS ai_insights (
    id UUID PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    insight JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_recommendations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    recommendation JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
