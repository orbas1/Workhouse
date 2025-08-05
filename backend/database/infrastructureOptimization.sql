CREATE TABLE IF NOT EXISTS infrastructure_load_predictions (
  id UUID PRIMARY KEY,
  service VARCHAR(255) NOT NULL,
  timeframe VARCHAR(50) NOT NULL,
  predicted_load NUMERIC NOT NULL,
  predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS operations_incident_predictions (
  id UUID PRIMARY KEY,
  service VARCHAR(255) NOT NULL,
  risk_score NUMERIC NOT NULL,
  predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
