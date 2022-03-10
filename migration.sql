DROP TABLE IF EXISTS pets;


CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    kind TEXT
);




INSERT INTO pets(age, name, kind) VALUES (4, 'Audie', 'dog');
INSERT INTO pets(age, name, kind) VALUES (7, 'Dewey', 'dog');
INSERT INTO pets(age, name, kind) VALUES (5, 'Erik', 'cat');
INSERT INTO pets(age, name, kind) VALUES (4, 'Schmitt', 'cat');


