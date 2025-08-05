-- Machine Learning Security Module Tables

CREATE TABLE IF NOT EXISTS ml_fraud_alerts (
    id UUID PRIMARY KEY,
    user_id UUID,
    transaction_id UUID,
    risk_level VARCHAR(20) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_privacy_compliance_reports (
    id UUID PRIMARY KEY,
    region VARCHAR(100),
    compliant BOOLEAN NOT NULL,
    details JSONB,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

