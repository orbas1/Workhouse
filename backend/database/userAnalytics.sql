-- Schema for user analytics module

CREATE TABLE IF NOT EXISTS user_engagement_metrics (
    id UUID PRIMARY KEY,
    metric_date DATE NOT NULL,
    active_users INTEGER NOT NULL,
    new_users INTEGER NOT NULL,
    sessions INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_activity_logs (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    action VARCHAR(255) NOT NULL,
    page VARCHAR(255),
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_conversion_rates (
    id UUID PRIMARY KEY,
    funnel_stage VARCHAR(100) NOT NULL,
    rate DECIMAL(5,2) NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_demographics (
    user_id UUID PRIMARY KEY,
    age_group VARCHAR(50),
    country VARCHAR(100),
    gender VARCHAR(50),
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_behavior_metrics (
    id UUID PRIMARY KEY,
    user_id UUID,
    metric_type VARCHAR(100) NOT NULL,
    metric_value JSON,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

