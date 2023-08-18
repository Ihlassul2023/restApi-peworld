
-- tabel untuk perekrut
CREATE TABLE recruiter (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL,
    position VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    photo_id VARCHAR,
    validate VARCHAR,
    is_active BOOLEAN DEFAULT false
    sector VARCHAR,
    province VARCHAR,
    city VARCHAR,
    description VARCHAR,
    email_hrd VARCHAR,
    email_corp VARCHAR,
    linkedin VARCHAR,
);
-- tabel untuk pekerja
CREATE TABLE worker (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    photo_id VARCHAR,
    validate VARCHAR,
    is_active BOOLEAN DEFAULT false,
    jobdesk VARCHAR,
    address VARCHAR,
    office VARCHAR,
    description VARCHAR,
);

--SKILL WORKER gabung ke profile worker--
CREATE TABLE skill (
    id SERIAL PRIMARY KEY,
    skills VARCHAR,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES worker(id)
);


--WORK EXPERIENCE gabung ke profile worker--
-- CREATE TABLE work_experience (
--     id SERIAL PRIMARY KEY,
--     position VARCHAR NOT NULL,
--     name VARCHAR NOT NULL,
--     since VARCHAR NOT NULL,
--     until VARCHAR NOT NULL,
--     description VARCHAR NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW()
--     user_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES worker(id)
-- );

-- ALTER TABLE work_experience ADD COLUMN user_id INT NOT NULL;

-- ALTER TABLE work_experience ADD FOREIGN KEY (user_id) REFERENCES profile_worker(id) ON DELETE CASCADE;

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
    FOREIGN KEY (user_id) REFERENCES worker(id)
);

--MESSAGE MENU--
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message_detail VARCHAR
);

CREATE TABLE experience (
        id SERIAL PRIMARY KEY,
        positon VARCHAR(200) NOT NULL,
        company_name VARCHAR(200) NOT NULL,
        fromMonth VARCHAR(255)NOT NULL,
        toMonth VARCHAR(255) NOT NULL,
        description VARCHAR(200) NOT NULL,
        user_id INT NOT NULL,
    );
ALTER TABLE experience ADD FOREIGN KEY (user_id) REFERENCES worker(id) ON DELETE CASCADE;

