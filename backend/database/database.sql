
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

-- Contract Module Tables

CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY,
    client_id UUID NOT NULL,
    freelancer_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    budget NUMERIC(10,2),
    timeline VARCHAR(255),
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contract_proposals (
    id UUID PRIMARY KEY,
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL,
    proposal_text TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contract_work_submissions (
    id UUID PRIMARY KEY,
    contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL,
    work_url VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'submitted',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP
);

