-- SQL schema for mentorship additional features

CREATE TABLE mentorship_pathways (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  steps JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentorship_group_sessions (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP NOT NULL,
  mentor_id UUID NOT NULL
);

CREATE TABLE mentorship_group_session_participants (
  session_id UUID REFERENCES mentorship_group_sessions(id),
  user_id UUID NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_id)
);

CREATE TABLE mentorship_live_qa_sessions (
  id UUID PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  mentor_id UUID NOT NULL
);

CREATE TABLE mentorship_forum_posts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentorship_resource_recommendations (
  id UUID PRIMARY KEY,
  mentee_id UUID NOT NULL,
  resource VARCHAR(255) NOT NULL,
  mentor_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentorship_resource_assignments (
  id UUID PRIMARY KEY,
  mentee_id UUID NOT NULL,
  resource VARCHAR(255) NOT NULL,
  mentor_id UUID NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentorship_confidentiality_agreements (
  session_id UUID PRIMARY KEY,
  agreement_text TEXT NOT NULL
);

CREATE TABLE mentorship_confidentiality_confirmations (
  session_id UUID REFERENCES mentorship_confidentiality_agreements(session_id),
  user_id UUID NOT NULL,
  confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_id)
);

CREATE TABLE mentorship_badges (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

