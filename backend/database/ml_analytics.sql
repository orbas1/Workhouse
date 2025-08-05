-- Machine Learning Analytics Module Tables

CREATE TABLE IF NOT EXISTS ml_recommendations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    recommendations JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_insights (
    id UUID PRIMARY KEY,
    domain VARCHAR(100) NOT NULL,
    insight JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_custom_queries (
    id UUID PRIMARY KEY,
    query TEXT NOT NULL,
    parameters JSONB,
    result JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_content_performance (
    id UUID PRIMARY KEY,
    content_id UUID NOT NULL,
    metrics JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_user_behavior_patterns (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    patterns JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_financial_forecasts (
    id UUID PRIMARY KEY,
    forecast JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_sentiment_analysis (
    id UUID PRIMARY KEY,
    domain VARCHAR(100) NOT NULL,
    sentiment JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

