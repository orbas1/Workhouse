CREATE TABLE marketplace_services (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE service_requests (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  service_id UUID REFERENCES marketplace_services(id),
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
  id UUID PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT
);

CREATE TABLE legal_resources (
  id UUID PRIMARY KEY,
  region VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT
);

CREATE TABLE funding_subscriptions (
  profile_id VARCHAR(255) PRIMARY KEY,
  preferences TEXT,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE funding_alerts (
  id UUID PRIMARY KEY,
  profile_id VARCHAR(255) REFERENCES funding_subscriptions(profile_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentorship_applications (
  id UUID PRIMARY KEY,
  applicant_id VARCHAR(255) NOT NULL,
  mentor_id VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentors (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  expertise VARCHAR(255) NOT NULL
);
