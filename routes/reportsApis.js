const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require("express").Router();

//show all invoices
const getReports = async (req, res) => {
    try {
        const result = await pool.query("select * from reports")
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

const getTotalSalesReport = async (request, response) => {
    try {

        const result = await pool.query(`SELECT SUM (total_price) FROM sales`);

        console.log(result.rows);

        if (result.rows.length > 0) {
            return response
                .status(200)
                .json({
                    status: `total sales report created`,
                    totalSale: `Euro: ${result.rows[0].sum}`
                })
        } else {
            console.log("there is an error")
        }
    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

// const getOverAllReport = async (request, response) => {
//     try {

//         const result = await pool.query(`SELECT SUM (total_price) FROM sales`);

//         console.log(result.rows);

//         if (result.rows.length > 0) {
//             return response
//                 .status(200)
//                 .json({
//                     status: `A Over All Report created`,
//                     OverAllReport: result.rows[0]
//                 })
//         } else {
//             console.log("there is an error")
//         }
//     } catch (error) {
//         console.error(error.message);
//         response.status(404).send({ error: error.message });
//     }
// }

router.get("/", getReports)
router.get("/total-sales", getTotalSalesReport)


module.exports = router;