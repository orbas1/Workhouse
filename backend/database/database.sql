
-- Affiliate Module Tables

CREATE TABLE IF NOT EXISTS affiliates (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    website VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS affiliate_agreements (
    id UUID PRIMARY KEY,
    affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    agreement_version INTEGER NOT NULL,
    agreed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matchmaking Module Tables

CREATE TABLE IF NOT EXISTS match_criteria (
    agency_id UUID PRIMARY KEY,
    skills_weight NUMERIC DEFAULT 0.5,
    availability_weight NUMERIC DEFAULT 0.3,
    performance_weight NUMERIC DEFAULT 0.2,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_matches (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    job_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    match_score NUMERIC NOT NULL,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

