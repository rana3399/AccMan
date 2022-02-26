const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require("express").Router();


//show all invoices
const getInvoices = async (req, res) => {
    try {
        const result = await pool.query("select * from invoices")
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


// create a new service
const addNewInvoice = async (request, response) => {
    try {
        const newInvoice = request.body;
        const { date, customer_id, sales_id, total_amount } = newInvoice;

        const result = await pool.query(
            `INSERT INTO invoices (date, customer_id, sales_id, total_amount)
        VALUES ($1, $2, $3, $4) returning id`,
            [date, customer_id, sales_id, total_amount]);

        if (result.rows.length > 0) {
            return response
                .status(200)
                .json({
                    status: `new invoice created`,
                    id: result.rows[0].id
                })
        } else {
            console.log("there is an error")
        }
    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

router.post("/", addNewInvoice)
router.get("/", getInvoices)


module.exports = router;