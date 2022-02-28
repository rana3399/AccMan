const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require("express").Router();

//show all customers 
const getCustomers = async (req, res) => {
    try {
        const result = await pool.query("select * from customers")
        if (result.rows.length > 0) {
            return res
                .status(200)
                .json(result.rows)
        } else {
            return res
                .status(404)
                .send("Ops, there is something wrong!")
        }
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
        const { customer_email, customer_name, customer_company_name } = request.body;

        const isEmailExists = await pool.query(
            `select from customers where customer_email = $1`, [customer_email])

        if (isEmailExists.rows.length > 0) {
            return response
                .status(404)
                .send("A customer with same email address already exists.")

        } else {
            const result = await pool.query(
                `INSERT INTO customers (customer_email, customer_name, customer_company_name)
            VALUES ($1, $2, $3) RETURNING id`,
                [
                    customer_email,
                    customer_name,
                    customer_company_name,
                ]);

            if (!customer_email || !customer_name || !customer_company_name || !result.rows.length > 0) {
                return response
                    .status(404)
                    .json({ status: "There is an error, please try again." })
            } else {
                return response
                    .status(201)
                    .json({
                        status: "New customer is created.",
                        NewCustomerId: result.rows[0].id
                    })
            }
        }

    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

router.get("/", getCustomers);
router.get("/:id", getCustomersById);
router.post("/", addNewCustomers);
router.get("/search", getCustomersByName);

module.exports = router;