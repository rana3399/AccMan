const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require('express').Router();

// create a new service
const addNewSale = async (request, response) => {
    try {
        const newSale = request.body;
        const { customer_id, service_id, total_price } = newSale;

        const result = await pool.query(
            `INSERT INTO sales (customer_id, service_id, total_price)
        VALUES ($1, $2, $3) returning id`,
            [customer_id, service_id, total_price]);




        if (result.rows.length > 0) {
            return response
                .status(200)
                .json({
                    status: `1 new sale!`,
                    new_sale_id: result.rows[0].id
                })
        } else {
            console.log("there is an error")
        }
    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

const allSales = async (request, response) => {
    const result = await pool.query(`select * from sales`);

    if (result.rows.length > 0) {
        return response
            .status(200)
            .send(result.rows)
    } else {
        console.log("there is an error")
    }
}

router.post("/", addNewSale);
router.get("/", allSales);

module.exports = router;