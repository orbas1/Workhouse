-- Enhanced User Experience Machine Learning Module Tables

CREATE TABLE IF NOT EXISTS ux_optimizations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    optimized_layout JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS engagement_heatmaps (
    id UUID PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    engagement_score NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_recommendations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    recommendations JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

