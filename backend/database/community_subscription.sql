CREATE TABLE community_subscriptions (
  id UUID PRIMARY KEY,
  community_id UUID NOT NULL,
  subscriber_id VARCHAR(255) NOT NULL,
  price NUMERIC(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
