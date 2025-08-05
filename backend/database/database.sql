-- Central database schema for Workhouse
-- Run individual module schemas as needed
\i users.sql
\i payouts.sql
-- Main database schema initialization
\i referrals.sql

-- Affiliate Onboarding resources and webinar registration tables

CREATE TABLE IF NOT EXISTS affiliate_onboarding_resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS affiliate_webinar_registrations (
  id SERIAL PRIMARY KEY,
  affiliate_id VARCHAR(255) NOT NULL,
  webinar_id INTEGER NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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


-- Job Module Tables

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    agency_id UUID,
    status VARCHAR(20) DEFAULT 'open',
    accepted_by UUID,
    accepted_at TIMESTAMP,
    assigned_to UUID,
    assigned_at TIMESTAMP,
    agency_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    budget NUMERIC,
    deadline DATE,
    status VARCHAR(20) DEFAULT 'open',
-- Analytics Module Tables

CREATE TABLE IF NOT EXISTS agency_earnings (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    earned_on DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agency_employee_performance (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    tasks_completed INTEGER NOT NULL,
    average_rating NUMERIC(3,2),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
-- Client Module Tables

CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    preferences JSONB,
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
-- Financial Module Tables

CREATE TABLE IF NOT EXISTS financial_records (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    amount NUMERIC(12,2) NOT NULL,
    description VARCHAR(255),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_forecasts (
    id UUID PRIMARY KEY,
    agency_id UUID NOT NULL,
    month DATE NOT NULL,
    projected_revenue NUMERIC(12,2) NOT NULL,
    projected_expense NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training Module Tables

CREATE TABLE IF NOT EXISTS training_sessions (
    id UUID PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_assignments (
    id UUID PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL,
    cover_letter TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

CREATE TABLE IF NOT EXISTS training_attendance (
    id UUID PRIMARY KEY,
    session_id UUID NOT NULL REFERENCES training_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    attended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Data Protection Module Tables
CREATE TABLE IF NOT EXISTS data_protection_policies (
    id UUID PRIMARY KEY,
    version INTEGER NOT NULL,
    policy TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_privacy_settings (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    marketing_emails BOOLEAN DEFAULT TRUE,
    data_sharing BOOLEAN DEFAULT FALSE,
    personalized_ads BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Analytics Module Tables

CREATE TABLE IF NOT EXISTS content_analytics (
    id UUID PRIMARY KEY,
    content_id UUID NOT NULL,
    views INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    feedback_score DECIMAL(3,2) DEFAULT 0,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_feedback (
    id UUID PRIMARY KEY,
    content_id UUID NOT NULL,
    user_id UUID NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Workspace Analytics Module Tables

CREATE TABLE IF NOT EXISTS workspace_analytics (
    id UUID PRIMARY KEY,
    workspace_id UUID NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    active_users INTEGER DEFAULT 0,
    projects_created INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    messages_exchanged INTEGER DEFAULT 0,
    collaboration_score NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
