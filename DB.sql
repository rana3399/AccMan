drop table if exists users;
drop table if exists customers;
drop table if exists services;

CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  user_email VARCHAR (120) not null,
  user_name VARCHAR (100)
);

CREATE TABLE customers (
  id    SERIAL PRIMARY KEY,
  customer_email VARCHAR (120) not null,
  customer_name VARCHAR (100),
  company_name VARCHAR (80)
);

CREATE TABLE services (
  id        SERIAL PRIMARY KEY,
  service_name VARCHAR (100) not null,
  descriptions VARCHAR (100),
  selling_price INT
);


INSERT INTO users (user_email, user_name) VALUES ('rana@gmail.com', 'Rana');
INSERT INTO users (user_email, user_name) VALUES ('Cristine@gmail.com', 'Cristine');

INSERT INTO customers (customer_email, customer_name, company_name) VALUES ('jhon@mail.com', 'jhon', 'apple');
INSERT INTO customers (customer_email, customer_name, company_name) VALUES ('sonia@gmail.com', 'sonia', 'amazon');
INSERT INTO customers (customer_email, customer_name, company_name) VALUES ('maria@gmail.com', 'maria', 'IREP');

--select * from users