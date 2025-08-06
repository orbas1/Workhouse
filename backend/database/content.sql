CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('podcast', 'webinar')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  owner_id UUID
);
