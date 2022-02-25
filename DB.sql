drop table if exists users;
drop table if exists customers cascade;
drop table if exists services cascade;
drop table if exists sales cascade;
drop table if exists invoices cascade;


CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  user_email VARCHAR (120) not null,
  user_name VARCHAR (100)
);

CREATE TABLE customers (
  id    SERIAL PRIMARY KEY,
  customer_email VARCHAR (120) not null,
  customer_name VARCHAR (100),
  customer_company_name VARCHAR (80)
);


CREATE TABLE services (
  id        SERIAL PRIMARY KEY,
  service_name VARCHAR (100) not null,
  descriptions VARCHAR (500),
  service_buying_price  INT not null,
  service_selling_price INT not null
);

CREATE TABLE sales (
  id        SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  service_id  INT REFERENCES services(id),
  total_price INT not null
);

CREATE TABLE invoices (
  id        SERIAL PRIMARY KEY,
  invoice_date      date ,
  customer_id INT REFERENCES customers(id),
  sales_id INT REFERENCES sales(id),
  total_amount INT not null
);



-- -- CREATE TABLE reports (
-- --   id        SERIAL PRIMARY KEY,
-- --   service_name VARCHAR (100) not null,
-- --   descriptions VARCHAR (500),
-- --   service_buying_price  INT not null,
-- --   service_selling_price INT not null
-- -- );

INSERT INTO users (user_email, user_name) VALUES ('rana@gmail.com', 'Rana');
INSERT INTO users (user_email, user_name) VALUES ('Cristine@gmail.com', 'Cristine');

INSERT INTO customers (customer_email, customer_name, customer_company_name) VALUES ('jhon@mail.com', 'jhon', 'apple');
INSERT INTO customers (customer_email, customer_name, customer_company_name) VALUES ('sonia@gmail.com', 'sonia', 'amazon');
INSERT INTO customers (customer_email, customer_name, customer_company_name) VALUES ('maria@gmail.com', 'maria', 'IREP');


INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('cleaning', 'Weekly cleaning and some descriptions', 5000, 8000);
INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('audit', 'auditing descriptions', 15000, 28000);
INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('designing', 'designing descriptions', 32000, 56000);

INSERT INTO sales (customer_id, service_id, total_price) VALUES (1, 2, 15555);

--select * from users

--select * from customers where customer_name LIKE '%mari%';