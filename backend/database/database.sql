
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


-- Feedback Module Tables

CREATE TABLE IF NOT EXISTS client_feedback (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    client_id UUID NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_feedback (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
