CREATE DATABASE dinner_app;
USE dinner_app;

CREATE TABLE recipes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO recipes (title)
VALUES 
('chili'),
('chicken fajitas');