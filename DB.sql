drop table if exists users;

CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  user_email VARCHAR (120) not null,
  user_name VARCHAR (100)
);


INSERT INTO users (user_email, user_name) VALUES ('jhon@mail.com', 'jhon');
INSERT INTO users (user_email, user_name) VALUES ('rana@gmail.com', 'Rana');
INSERT INTO users (user_email, user_name) VALUES ('Cristine@gmail.com', 'Cristine');

--select * from users