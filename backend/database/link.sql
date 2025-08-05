CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY,
  affiliate_id VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  material_type VARCHAR(100) DEFAULT 'link',
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
