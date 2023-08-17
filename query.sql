-- Active: 1689385551112@@127.0.0.1@5432@kelompok3
--REGISTER USER--
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