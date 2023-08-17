--REGISTER USER--
CREATE TABLE register_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    company VARCHAR,
    position VARCHAR,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    photo_id VARCHAR,
    check VARCHAR,
    is_active BOOLEAN DEFAULT false
);