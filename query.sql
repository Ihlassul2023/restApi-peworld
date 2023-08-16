--REGISTER--
CREATE TABLE register_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR,
    phone VARCHAR,
    password VARCHAR
)
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    password VARCHAR
)