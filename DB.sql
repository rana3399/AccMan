drop table if exists users;
drop table if exists customers cascade;
drop table if exists services cascade;
drop table if exists sales cascade;
drop table if exists invoices cascade;
drop table if exists reports cascade;


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


CREATE TABLE reports (
  id        SERIAL PRIMARY KEY,
  delivery_date DATE DEFAULT CURRENT_DATE,
  from_date      date,
  to_date      date,
  total_sales  INT,
  total_cost  INT,
  gross_profit  INT
);

INSERT INTO users (user_email, user_name) VALUES ('rana@gmail.com', 'Rana');
INSERT INTO users (user_email, user_name) VALUES ('Cristine@gmail.com', 'Cristine');

INSERT INTO customers (customer_email, customer_name, customer_company_name) VALUES ('jhon@mail.com', 'jhon', 'apple');
INSERT INTO customers (customer_email, customer_name, customer_company_name) VALUES ('sonia@gmail.com', 'sonia', 'amazon');
INSERT INTO customers (customer_email, customer_name, customer_company_name) VALUES ('maria@gmail.com', 'maria', 'IREP');


INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('cleaning', 'Weekly cleaning and some descriptions', 5000, 8000);
INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('audit', 'auditing descriptions', 15000, 28000);
INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('designing', 'designing descriptions', 32000, 56000);

INSERT INTO sales (customer_id, service_id, total_price) VALUES (1, 2, 15555);

INSERT INTO invoices (invoice_date, customer_id, sales_id, total_amount) VALUES ('2022-03-15', 3, 2, 189000);

INSERT INTO reports (from_date, to_date, total_sales, total_cost, gross_profit
) VALUES ('2021-03-15', '2022-02-14', 300000, 120000, 180000);

--SELECT SUM (total_price) FROM sales returning id;

--select * from sales

--select * from customers where customer_name LIKE '%mari%';