-- Predictive Analytics and Forecasting Machine Learning Tables

CREATE TABLE IF NOT EXISTS user_retention_predictions (
    id UUID PRIMARY KEY,
    days INTEGER NOT NULL,
    retention_rate DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS market_trend_forecasts (
    id UUID PRIMARY KEY,
    industry VARCHAR(100),
    horizon INTEGER NOT NULL,
    forecast JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
