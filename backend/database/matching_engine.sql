-- Tables for mentorship matching engine

CREATE TABLE IF NOT EXISTS mentorship_matches (
    id UUID PRIMARY KEY,
    mentor_id UUID NOT NULL,
    mentee_id UUID NOT NULL,
    match_score NUMERIC(5,2),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_invitations (
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL,
    recipient_id UUID NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trial_sessions (
    id UUID PRIMARY KEY,
    mentor_id UUID NOT NULL,
    mentee_id UUID NOT NULL,
    scheduled_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

