-- Real-Time ML Analytics Module Tables

CREATE TABLE IF NOT EXISTS real_time_engagement_analytics (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL,
    metrics JSONB NOT NULL,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
