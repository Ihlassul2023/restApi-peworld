-- Active: 1689385551112@@127.0.0.1@5432@kelompok3
--REGISTER USER--
<<<<<<< HEAD
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
    linkedin VARCHAR,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES register_user(id)
);


--PROFILE WORKER--
--NOTED FOREIGN KEY BLM DIBUAT--
--foreign connect ke work experience dan porto--
CREATE TABLE profile_worker (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR,
    jobdesk VARCHAR,
    address VARCHAR,
    office VARCHAR,
    description VARCHAR,
    skill VARCHAR,
    user_id INT,
    experience_id INT,
    portofolio_id INT,
    FOREIGN KEY (user_id) REFERENCES register_user(id)
    FOREIGN KEY (experience_id) REFERENCES work_experience(id)
    FOREIGN KEY (portofolio_id) REFERENCES portofolio(id)
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

ALTER TABLE work_experience ADD COLUMN user_id INT NOT NULL;

ALTER TABLE work_experience ADD FOREIGN KEY (user_id) REFERENCES profile_worker(id) ON DELETE CASCADE;

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
=======
CREATE TABLE experience (
        id SERIAL PRIMARY KEY,
        positon VARCHAR(200) NOT NULL,
        company_name VARCHAR(200) NOT NULL,
        fromMonth VARCHAR(255)NOT NULL,
        toMonth VARCHAR(255) NOT NULL,
        description VARCHAR(200) NOT NULL,
    );
ALTER TABLE experience ADD COLUMN user_id INT NOT NULL;
ALTER TABLE experience ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
>>>>>>> fitur_lowongan


CREATE TABLE
    skill(
        skill_name VARCHAR NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES register_user(id)
    );