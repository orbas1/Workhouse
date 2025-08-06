-- SQL table for storing user notification settings
CREATE TABLE IF NOT EXISTS notification_settings (
    user_id UUID PRIMARY KEY,
    email BOOLEAN DEFAULT TRUE,
    sms BOOLEAN DEFAULT FALSE,
    push BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
