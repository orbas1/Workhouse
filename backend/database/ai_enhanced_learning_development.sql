-- AI-Enhanced Learning and Development Machine Learning Module Tables

CREATE TABLE IF NOT EXISTS learning_outcomes (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL,
    outcome JSONB NOT NULL,
    suggestions JSONB NOT NULL,
    assessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS custom_learning_paths (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    path JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
