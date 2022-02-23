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
            console.log(reqId);

            const findSearchedCustomer = await pool.query("select * from customers where id = $1", [reqId]);
            console.log(findSearchedCustomer.rows);

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
            const reqbody = req.query.name;
            console.log(reqbody);

            const searchedCustomerNameQuery = await pool.query(`select * from customers where customer_name LIKE ${reqbody}`);
            console.log(searchedCustomerNameQuery.rows);

            if (searchedCustomerNameQuery.rows.length > 0) {
                return res
                    .status(200)
                    .json(searchedCustomerNameQuery.rows)
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



    return {
        getCustomers,
        getCustomersById,
        getCustomersByName
    }


}

module.exports = customersApis;