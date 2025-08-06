CREATE TABLE IF NOT EXISTS platform_config (
    id SERIAL PRIMARY KEY,
    settings JSONB NOT NULL
);
