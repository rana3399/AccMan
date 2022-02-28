drop table if exists users;
drop table if exists customers cascade;
drop table if exists services cascade;
drop table if exists sales cascade;
drop table if exists expenses cascade;
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
  service_buying_price   INT not null,
  service_selling_price INT not null
);

CREATE TABLE sales (
  id        SERIAL PRIMARY KEY,
  sales_date  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  customer_id INT REFERENCES customers(id),
  service_id  INT REFERENCES services(id),
  service_buying_price   INT not null,
  service_selling_price INT not null,
  total_price INT not null
);


CREATE TABLE expenses (
  from_date      date NOT NULL,
  to_date      date NOT NULL,
  salary       INT not null,
  management_cost INT not null
);


-- CREATE TABLE invoices (
--   id        SERIAL PRIMARY KEY,
--   invoice_date      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   customer_id INT REFERENCES customers(id) not null,
--   sales_id INT sales(id) not null,
--   total_amount INT not null
-- );

CREATE TABLE invoices (
  id        SERIAL PRIMARY KEY,
  invoice_date      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  sales_date  date not null
  customer_id INT REFERENCES customers(id) not null,
  customer_name VARCHAR (100) not null,
  service_name  VARCHAR (300) not null,
  sales_id INT REFERENCES sales(id) not null,
  total_amount INT not null
);
select s.sales_date, cus.customer_name, srv.service_name, s.id as SalesId, s.total_price from sales s 
INNER JOIN customers cus on s.customer_id = cus.id
INNER JOIN services srv on s.service_id = srv.id 
where s.id = 3


CREATE TABLE reports (
  id        SERIAL PRIMARY KEY,
  delivery_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('audit', 'auditing descriptions', 10000, 10000);
INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price) VALUES ('designing', 'designing descriptions', 32000, 56000);

INSERT INTO sales (sales_date, customer_id, service_id, service_buying_price, service_selling_price, total_price) VALUES ('2021-07-14', 1, 2, 10000, 15000, 15000);
INSERT INTO sales (sales_date , customer_id, service_id, service_buying_price, service_selling_price, total_price) VALUES ('2022-03-14',3, 1, 2000, 8000, 8000);
INSERT INTO sales (sales_date, customer_id, service_id, service_buying_price, service_selling_price, total_price) VALUES ('2022-02-26', 2, 2, 35000, 50000, 50000);
INSERT INTO sales (sales_date, customer_id, service_id, service_buying_price, service_selling_price, total_price) VALUES ('2021-02-04', 1, 2, 10000, 55000, 55000);
INSERT INTO sales (sales_date , customer_id, service_id, service_buying_price, service_selling_price, total_price) VALUES ('2022-03-14',3, 1, 2000, 80000, 80000);
INSERT INTO sales (sales_date, customer_id, service_id, service_buying_price, service_selling_price, total_price) VALUES ('2022-02-16', 2, 2, 35000, 40000, 40000);

INSERT INTO expenses (from_date, to_date, salary, management_cost) VALUES ('2021-01-01', '2021-01-31', 2000, 3000);
INSERT INTO expenses (from_date, to_date, salary, management_cost) VALUES ('2021-02-01', '2021-02-28', 5000, 2500);
INSERT INTO expenses (from_date, to_date, salary, management_cost) VALUES ('2022-03-01', '2022-03-31', 6000, 1300);


INSERT INTO invoices (customer_id, sales_id, total_amount) VALUES (2, 1, 15000);

INSERT INTO reports (from_date, to_date, total_sales, total_cost, gross_profit
) VALUES ('2021-03-15', '2022-02-14', 300000, 120000, 180000);


select sales_date, service_selling_price, total_price from sales where id = 1

select s.sales_date, cus.customer_name, srv.service_name, s.id as SalesId, s.total_price from sales s 
INNER JOIN customers cus on s.customer_id = cus.id
INNER JOIN services srv on s.service_id = srv.id 
where s.id = 3


-- select *, service_buying_price + service_selling_price as total from sales 
-- where sales_date >= '2021-01-01'
-- and sales_date <= '2021-12-31';

-- SELECT SUM(COALESCE(salary,0) + COALESCE(management_cost,0)) 
-- FROM expenses
-- where from_date >= '2021-01-01'
-- and to_date <= '2021-12-31';

-- SELECT SUM(management_cost) from expenses
-- SELECT SUM(salary + management_cost) from expenses

-- select * from sales

-- SELECT SUM(salary + management_cost) from expenses

-- SELECT SUM(salary + management_cost) from expenses
--         WHERE from_date >= '2021-01-01' AND to_date <= '2021-12-31';
