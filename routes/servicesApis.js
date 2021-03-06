const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require('express').Router();

// show all services
const getServices = async (req, res) => {
    try {
        const result = await pool.query("select * from services")
        return res
            .status(200)
            .json(result.rows)

    } catch (error) {
        console.error(error)
        res.status("404").send(error)
    }
}

//search services by name
const getServicesByName = async (req, res) => {
    try {
        const reqbody = `%${req.query.name}%`;
        const searchedCustomerByNameQuery = await pool.query(`select * from services where service_name LIKE $1`, [reqbody]);

        if (searchedCustomerByNameQuery.rows.length > 0) {
            return res
                .status(200)
                .json(searchedCustomerByNameQuery.rows)
        } else {
            return res
                .status(404)
                .send("Service name doesn't exists!")
        }

    } catch (error) {
        console.error(error)
        res.status("404").send(error)
    }
}

// create a new service
const addNewService = async (request, response) => {
    try {
        const { service_name, descriptions, service_buying_price, service_selling_price } = request.body;

        const result = await pool.query(
            `INSERT INTO services (service_name, descriptions, service_buying_price, service_selling_price)
        VALUES ($1, $2, $3, $4) returning id`,
            [
                service_name,
                descriptions,
                service_buying_price,
                service_selling_price
            ]);

        if (!service_name ||
            !descriptions ||
            !service_buying_price ||
            !service_selling_price || !result.rows.length > 0) {
            return res
                .status(404)
                .send("There is an error, please try again.")
        } else {
            return response
                .status(201)
                .send(`New service with id: ${result.rows[0].id} and service name: ${service_name} has been created.`)
        }
    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });

    }
}

// modify an existing services
const modifyService = async (request, response) => {
    try {
        const reqServiceId = parseInt(request.params.id);
        const { service_name, descriptions, service_buying_price, service_selling_price } = request.body;

        const modifyQueryResult = await pool.query(
            `UPDATE services SET 
            service_name = $1, 
            descriptions = $2, 
            service_buying_price = $3, 
            service_selling_price = $4
            where id = $5 returning id`,
            [
                service_name,
                descriptions,
                service_buying_price,
                service_selling_price,
                reqServiceId
            ]);

        if (service_name ||
            descriptions ||
            service_buying_price ||
            service_selling_price) {

            return response
                .status(201)
                .send(`Service with id: ${modifyQueryResult.rows[0].id} and has been modified.`)

        } else {
            return response
                .status(404)
                .send("There is an error, please try again.")
        }

    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

router.get("/", getServices);
router.get("/search", getServicesByName);
router.post("/", addNewService);
router.put("/:id", modifyService);

module.exports = router;