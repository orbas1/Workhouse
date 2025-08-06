-- Tables for service provider analytics module

CREATE TABLE service_providers (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE services (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES service_providers(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_availability (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES service_providers(id),
  date DATE NOT NULL,
  slots JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_bookings (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL,
  provider_id UUID REFERENCES service_providers(id),
  service_id UUID REFERENCES services(id),
  date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio items are defined in portfolio.sql

CREATE TABLE provider_testimonials (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES service_providers(id),
  client_id UUID NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customization_requests (
  id UUID PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  client_id UUID NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY,
  provider_id UUID REFERENCES service_providers(id),
  client_id UUID NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

