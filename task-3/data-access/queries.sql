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

CREATE TABLE groups
	(id serial NOT NULL PRIMARY KEY, 
	name VARCHAR(255),
	permissions text[],
	CONSTRAINT 
        chk_Permissions 
        CHECK(permissions <@ (ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']))
	)

		INSERT INTO groups (name, permissions)
VALUES ('group2', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');


CREATE TABLE user_group (
  id serial NOT NULL PRIMARY KEY,
  group_id    int REFERENCES groups (id) ON DELETE CASCADE,
	user_id int REFERENCES users (id) ON DELETE CASCADE
);

insert into user_group (user_id, group_id) values (4, 3)
