
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

-- Agency Analytics Module Tables

CREATE TABLE IF NOT EXISTS agency_analytics (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    metrics JSONB NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_agency_analytics_agency_id ON agency_analytics(agency_id);


-- Classroom Analytics Module Tables

CREATE TABLE IF NOT EXISTS classroom_engagement (
    id UUID PRIMARY KEY,
    classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
    attendance_rate NUMERIC(5,2) NOT NULL,
    participation_rate NUMERIC(5,2) NOT NULL,
    average_score NUMERIC(5,2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS classroom_completion (
    id UUID PRIMARY KEY,
    classroom_id UUID NOT NULL REFERENCES classrooms(id) ON DELETE CASCADE,
    completion_rate NUMERIC(5,2) NOT NULL,
    average_completion_time INTEGER,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dispute Analytics Module Tables

CREATE TABLE IF NOT EXISTS disputes (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'open',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);


-- Education Analytics Module Tables

CREATE TABLE IF NOT EXISTS course_analytics (
    course_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    enrollments INTEGER DEFAULT 0,
    completions INTEGER DEFAULT 0,
    average_score NUMERIC(5,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_course_engagement (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    time_spent INTEGER DEFAULT 0,
    progress NUMERIC(5,2) DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Analytics Module Tables

CREATE TABLE IF NOT EXISTS financial_revenues (
    id UUID PRIMARY KEY,
    source VARCHAR(100) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_expenses (
    id UUID PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crypto_transactions (
    id UUID PRIMARY KEY,
    currency VARCHAR(20) NOT NULL,
    amount NUMERIC(18, 8) NOT NULL,
    value_usd NUMERIC(12, 2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
