-- Operational Efficiency and Security Machine Learning Module Tables

CREATE TABLE IF NOT EXISTS ml_threat_detections (
    id UUID PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    description TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_operation_metrics (
    id UUID PRIMARY KEY,
    cpu_usage NUMERIC NOT NULL,
    memory_usage NUMERIC NOT NULL,
    notes TEXT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ml_api_usage_stats (
    id UUID PRIMARY KEY,
    endpoint VARCHAR(255) NOT NULL,
    avg_response_time NUMERIC NOT NULL,
    error_rate NUMERIC NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
