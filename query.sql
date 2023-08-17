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
    validate VARCHAR,
    is_active BOOLEAN DEFAULT false
);

--PROFILE COMPANY--
CREATE TABLE profile_company (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    sector VARCHAR,
    province VARCHAR,
    city VARCHAR,
    description VARCHAR,
    email_hrd VARCHAR,
    email_corp VARCHAR,
    phone VARCHAR,
    linkedin VARCHAR
);


--PROFILE WORKER--
CREATE TABLE profile_worker (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR,
    jobdesk VARCHAR,
    address VARCHAR,
    office VARCHAR,
    description VARCHAR,
    skill VARCHAR
);


-- --SKILL WORKER gabung ke profile worker--
-- CREATE TABLE skills (
--     id SERIAL PRIMARY KEY,
    
-- );


--WORK EXPERIENCE--
CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    position VARCHAR,
    name VARCHAR,
    since VARCHAR,
    until VARCHAR,
    description VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


--PORTOFOLIO--
CREATE TABLE portofolio (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    link_repo VARCHAR,
    type VARCHAR,
    photo VARCHAR,
    photo_id VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

--MESSAGE MENU--
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message_detail VARCHAR
);