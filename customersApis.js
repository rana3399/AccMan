const express = require("express");
const app = express();

const { Pool } = require("pg");
const secrets = require("./secrets.json")
const pool = new Pool(secrets);

const customersApis = () => {

    const getCustomers = async (req, res) => {
        try {
            const result = await pool.query("select * from customers")
            return res
                .status(200)
                .json(result.rows)

        } catch (error) {
            console.error(error)
            res.status("404").send(error)

        }
    }

    //search customers by id
    const getCustomersById = async (req, res) => {
        try {
            const reqId = parseInt(req.params.id)
            const findSearchedCustomer = await pool.query("select * from customers where id = $1", [reqId]);

            if (findSearchedCustomer.rows.length > 0) {
                return res
                    .status(200)
                    .json(findSearchedCustomer.rows)
            } else {
                return res
                    .status(404)
                    .send("Customer doesn't exists!")
            }

        } catch (error) {
            console.error(error)
            res.status("404").send(error)

        }
    }

    //search customers by name
    const getCustomersByName = async (req, res) => {
        try {
            const reqbody = `%${req.query.name}%`;

            const searchedCustomerByNameQuery = await pool.query(`select * from customers where customer_name LIKE $1`, [reqbody]);

            if (searchedCustomerByNameQuery.rows.length > 0) {
                return res
                    .status(200)
                    .json(searchedCustomerByNameQuery.rows)
            } else {
                return res
                    .status(404)
                    .send("Customer name doesn't exists!")
            }

        } catch (error) {
            console.error(error)
            res.status("404").send(error)
        }
    }

    // create a new customer
    const addNewCustomers = async (request, response) => {
        try {
            const newCustomer = request.body;
            const { customer_email, customer_name, customer_company_name } = newCustomer;

            const result = await pool.query(
                `INSERT INTO customers (customer_email, customer_name, customer_company_name)
        VALUES ($1, $2, $3)`,
                [
                    customer_email,
                    customer_name,
                    customer_company_name,
                ]);

            console.log(result.rows);

            if (!customer_email || !customer_name || !customer_company_name || !result.rows.length > 0) {
                return res
                    .status(404)
                    .send("There is an error, please try again.")
            }
        } catch (error) {
            console.error(error.message);
            response.status(404).send({ error: error.message });

        }
    }



    return {
        getCustomers,
        getCustomersById,
        getCustomersByName,
        addNewCustomers
    }
}

module.exports = customersApis;