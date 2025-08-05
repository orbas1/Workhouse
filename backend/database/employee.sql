-- SQL schema for Employee (Gig Worker/Freelancer) Management module

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  username VARCHAR(255) UNIQUE
);

CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES job_postings(id),
  applicant_name VARCHAR(255) NOT NULL,
  resume TEXT
);

CREATE TABLE onboarding_records (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  start_date DATE,
  end_date DATE,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE performance_reviews (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  reviewer VARCHAR(255),
  comments TEXT,
  rating INTEGER
);

CREATE TABLE training_sessions (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255),
  session_date DATE
);

CREATE TABLE training_attendance (
  session_id INTEGER REFERENCES training_sessions(id),
  employee_id INTEGER REFERENCES employees(id),
  PRIMARY KEY (session_id, employee_id)
);

CREATE TABLE compensation (
  employee_id INTEGER PRIMARY KEY REFERENCES employees(id),
  salary NUMERIC
);

CREATE TABLE benefits_catalog (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE employee_benefits (
  employee_id INTEGER REFERENCES employees(id),
  benefit_id INTEGER REFERENCES benefits_catalog(id),
  PRIMARY KEY (employee_id, benefit_id)
);

CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  message TEXT
);

CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  issue TEXT
);

CREATE TABLE policies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);

CREATE TABLE policy_acknowledgements (
  policy_id INTEGER REFERENCES policies(id),
  employee_id INTEGER REFERENCES employees(id),
  acknowledged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (policy_id, employee_id)
);

CREATE TABLE surveys (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);

CREATE TABLE survey_results (
  survey_id INTEGER REFERENCES surveys(id),
  employee_id INTEGER REFERENCES employees(id),
  answers JSONB
);

CREATE TABLE payroll_integrations (
  id SERIAL PRIMARY KEY,
  payload JSONB
);

CREATE TABLE safety_reports (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  description TEXT
);

CREATE TABLE health_screenings (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  screening_type VARCHAR(255),
  screening_date DATE
);
