CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('podcast', 'webinar')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[],
  categories TEXT[],
  duration INT,
  cover_image TEXT,
  promo_video TEXT,
  audio_url TEXT,
  slides_url TEXT,
  publish_at TIMESTAMP,
  visibility VARCHAR(20) DEFAULT 'public',
  price NUMERIC(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft',
  owner_id UUID
);
