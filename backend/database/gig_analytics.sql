-- Gig Analytics Module Tables

CREATE TABLE IF NOT EXISTS gig_market_trends (
    id UUID PRIMARY KEY,
    month VARCHAR(7) NOT NULL,
    posted_jobs INT NOT NULL DEFAULT 0,
    completed_jobs INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gig_job_stats (
    job_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed INT NOT NULL DEFAULT 0,
    total INT NOT NULL DEFAULT 0,
    satisfaction NUMERIC(3,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gig_satisfaction (
    id UUID PRIMARY KEY,
    job_id UUID REFERENCES gig_job_stats(job_id),
    rating NUMERIC(3,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
