CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  cv TEXT,
  cv_filename TEXT,
  cover_letter TEXT,
  cover_letter_filename TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
