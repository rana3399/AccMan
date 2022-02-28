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


// create a new service by sales id
const createNewInvoice = async (request, response) => {
    try {
        const newInvoice = request.body;
        const { sales_id } = newInvoice;

        const result = await pool.query(`select 
        s.sales_date, 
        cus.customer_name, 
        srv.service_name, 
        s.id as SalesId, 
        s.total_price from sales s 
            INNER JOIN customers cus on s.customer_id = cus.id
            INNER JOIN services srv on s.service_id = srv.id 
            where s.id = $1`, [sales_id]
        )
        console.log(result.rows);

        if (result.rows.length > 0) {
            return response
                .status(201)
                .json({
                    status: `new invoice created`,
                    sellingDate: result.rows[0].sales_date,
                    customerName: result.rows[0].customer_name,
                    serviceName: result.rows[0].service_name,
                    salesID: result.rows[0].salesid,
                    price: result.rows[0].total_price
                })
        } else {
            console.log("there is an error")
        }
    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

router.post("/make-invoice", createNewInvoice)
router.get("/", getInvoices)


module.exports = router;