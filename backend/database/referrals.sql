-- Table for tracking affiliate referrals
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY,
    affiliate_id VARCHAR(255) NOT NULL,
    referred_user_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
