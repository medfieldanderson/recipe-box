DROP DATABASE dinner_app;
CREATE DATABASE dinner_app;
USE dinner_app;

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    recipe_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    unit VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE instructions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    recipe_id INTEGER NOT NULL,
    step INTEGER NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);
-- INSERT INTO recipes (title)
-- VALUES 
-- ('chili');

-- INSERT INTO recipes (title)
-- VALUES 
-- ('chicken fajitas');