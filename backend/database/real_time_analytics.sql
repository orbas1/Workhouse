-- Real-time Analytics Module Tables

CREATE TABLE IF NOT EXISTS real_time_metrics (
    id UUID PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    metrics JSONB NOT NULL,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trend_metrics (
    id UUID PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    data JSONB NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_behavior_metrics (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    behavior JSONB NOT NULL,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_forecasts (
    id UUID PRIMARY KEY,
    forecast JSONB NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sentiment_metrics (
    id UUID PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    sentiment JSONB NOT NULL,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS engagement_heatmaps (
    id UUID PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    heatmap JSONB NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_performance (
    id UUID PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL,
    metrics JSONB NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_usage_stats (
    id UUID PRIMARY KEY,
    endpoint VARCHAR(255) NOT NULL,
    requests INTEGER NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS education_outcomes (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL,
    outcomes JSONB NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS custom_analytics_reports (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parameters JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
