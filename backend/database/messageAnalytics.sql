-- Message Analytics Module Tables

CREATE TABLE IF NOT EXISTS message_events (
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    responded_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS message_metrics (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    peer_user_id UUID NOT NULL,
    message_count INTEGER NOT NULL DEFAULT 0,
    average_response_time_ms INTEGER,
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL
);
