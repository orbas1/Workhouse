-- Enhanced Content Discovery and Curation Machine Learning Tables

CREATE TABLE IF NOT EXISTS trending_topics (
    id UUID PRIMARY KEY,
    topic TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS curated_feeds (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    interests JSONB,
    interactions JSONB,
    feedback JSONB,
    curated_content JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
