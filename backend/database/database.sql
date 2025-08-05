
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

-- Security Module Tables

CREATE TABLE IF NOT EXISTS security_logs (
    id UUID PRIMARY KEY,
    user_identifier VARCHAR(255),
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_sessions (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_incidents (
    id UUID PRIMARY KEY,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS privacy_settings (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    settings JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS compliance_audits (
    id UUID PRIMARY KEY,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'in-progress',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

