--REGISTER USER--
CREATE TABLE register_company (
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
CREATE TABLE register_worker (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
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
    linkedin VARCHAR,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES register_company(id)
);


--PROFILE WORKER--
--NOTED FOREIGN KEY BLM DIBUAT--
--foreign connect ke work experience dan porto--
CREATE TABLE profile_worker (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    jobdesk VARCHAR,
    address VARCHAR,
    office VARCHAR,
    description VARCHAR,
    user_id INT,
    experience_id INT,
    portofolio_id INT,
    skill_id INT,
    FOREIGN KEY (user_id) REFERENCES register_worker(id)
    FOREIGN KEY (experience_id) REFERENCES work_experience(user_id)
    FOREIGN KEY (portofolio_id) REFERENCES portofolio(user_id)
    FOREIGN KEY (skill_id) REFERENCES skill(user_id)
);


--SKILL WORKER gabung ke profile worker--
CREATE TABLE skill (
    id SERIAL PRIMARY KEY,
    skills VARCHAR,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES register_worker(id)
);


--WORK EXPERIENCE gabung ke profile worker--
CREATE TABLE work_experience (
    id SERIAL PRIMARY KEY,
    position VARCHAR,
    name VARCHAR,
    since VARCHAR,
    until VARCHAR,
    description VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES register_worker(id)
);


--PORTOFOLIO gabung ke profile worker--
CREATE TABLE portofolio (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    link_repo VARCHAR,
    type VARCHAR,
    photo VARCHAR,
    photo_id VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES register_worker(id)
);

--MESSAGE MENU--
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message_detail VARCHAR
);