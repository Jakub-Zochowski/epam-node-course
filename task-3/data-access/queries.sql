CREATE TABLE users 
	(id serial NOT NULL PRIMARY KEY, 
	login VARCHAR(255),
	password VARCHAR(255),
	age NUMERIC,
	is_disabled BOOLEAN DEFAULT FALSE
	)

INSERT INTO users (login, password, age) VALUES ('testUser1', 'myPassword1', 21)
INSERT INTO users (login, password, age) VALUES ('testUser2', 'myPassword2', 31)
INSERT INTO users (login, password, age) VALUES ('testUser3', 'myPassword3', 41)
INSERT INTO users (login, password, age) VALUES ('testUser4', 'myPassword4', 51)

