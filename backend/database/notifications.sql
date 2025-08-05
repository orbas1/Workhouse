-- SQL table for storing commission rate change notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY,
  affiliate_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
