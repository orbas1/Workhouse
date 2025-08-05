-- Financial Forecasting Module Tables

CREATE TABLE IF NOT EXISTS financial_forecasts (
    id UUID PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    forecast_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS custom_financial_forecasts (
    id UUID PRIMARY KEY,
    params JSONB NOT NULL,
    result JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
