-- Tables for user feedback and goal adjustments

CREATE TABLE IF NOT EXISTS goal_feedback (
    id UUID PRIMARY KEY,
    goal_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS goal_adjustments (
    id UUID PRIMARY KEY,
    goal_id VARCHAR(255) NOT NULL,
    adjustment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS module_feedback (
    id UUID PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS module_feedback_actions (
    id UUID PRIMARY KEY,
    feedback_id UUID,
    action TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
