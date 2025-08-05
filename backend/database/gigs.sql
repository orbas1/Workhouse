CREATE TABLE IF NOT EXISTS gigs (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    seller_id UUID NOT NULL,
    buyer_id UUID,
    status TEXT NOT NULL,
    orders INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
