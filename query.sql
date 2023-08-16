--REGISTER USER--
CREATE TABLE register_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    photo_id VARCHAR
)

--LOGIN--
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
)