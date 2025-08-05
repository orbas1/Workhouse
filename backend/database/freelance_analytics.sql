-- Freelance Analytics Module Tables

CREATE TABLE IF NOT EXISTS freelance_market_trends (
    id UUID PRIMARY KEY,
    metric VARCHAR(100) NOT NULL,
    value NUMERIC NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS freelance_job_analytics (
    id UUID PRIMARY KEY,
    job_id UUID NOT NULL,
    applications INTEGER DEFAULT 0,
    hires INTEGER DEFAULT 0,
    completion_rate NUMERIC(5,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS freelancer_performance (
    id UUID PRIMARY KEY,
    freelancer_id UUID NOT NULL,
    jobs_completed INTEGER DEFAULT 0,
    rating_avg NUMERIC(3,2),
    earnings_total NUMERIC,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS freelance_client_satisfaction (
    id UUID PRIMARY KEY,
    client_id UUID NOT NULL,
    satisfaction_score NUMERIC(3,2),
    feedback_count INTEGER DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
