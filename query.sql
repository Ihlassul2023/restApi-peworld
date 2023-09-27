
-- Active: 1692279971681@@147.139.210.135@5432@kb03

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
    is_active BOOLEAN DEFAULT false,
    sector VARCHAR,
    province VARCHAR,
    city VARCHAR,
    description VARCHAR,
    email_hrd VARCHAR,
    email_corp VARCHAR,
    linkedin VARCHAR
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
    description VARCHAR
);

--PORTOFOLIO gabung ke profile worker--
CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    link_repo VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    photo VARCHAR NOT NULL,
    photo_id VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES worker(id)
);
--table participant chat 
CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    user_1 INT NOT NULL,
    user_2 INT NOT NULL,
    FOREIGN KEY (user_1) REFERENCES recruiter(id),
    FOREIGN KEY (user_2) REFERENCES worker(id),
    chat_code VARCHAR NULL
);
--MESSAGE MENU--
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message VARCHAR,
    user_1 INT NOT NULL,
    user_2 INT NOT NULL,
    FOREIGN KEY (user_1) REFERENCES recruiter(id),
    FOREIGN KEY (user_2) REFERENCES worker(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chat_code VARCHAR NULL,
    user_id INT NOT NULL
);

-- table experience
CREATE TABLE experience (
        id SERIAL PRIMARY KEY,
        position VARCHAR(200) NOT NULL,
        company_name VARCHAR(200) NOT NULL,
        from_month VARCHAR(255)NOT NULL,
        to_month VARCHAR(255) NOT NULL,
        description VARCHAR(200) NOT NULL,
        user_id INT NOT NULL
    );
ALTER TABLE experience ADD FOREIGN KEY (user_id) REFERENCES worker(id) ON DELETE CASCADE;


-- table skill
CREATE TABLE
    skill(
         id SERIAL PRIMARY KEY,
        skill_name VARCHAR NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES worker(id)
    );

