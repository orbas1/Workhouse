
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


-- Payment Module Tables

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    job_id UUID NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'disbursed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_adjustments (
    id UUID PRIMARY KEY,
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    old_amount NUMERIC(10,2) NOT NULL,
    new_amount NUMERIC(10,2) NOT NULL,
    reason VARCHAR(255),
    adjusted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employment Analytics Module Tables

CREATE TABLE IF NOT EXISTS employment_analytics (
    id UUID PRIMARY KEY,
    job_id UUID UNIQUE NOT NULL,
    views INTEGER DEFAULT 0,
    applications INTEGER DEFAULT 0,
    hires INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS application_analytics (
    id UUID PRIMARY KEY,
    job_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
