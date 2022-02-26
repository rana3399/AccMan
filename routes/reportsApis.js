const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require("express").Router();

// get a sale report by date or without date
const createSaleReportByDate = async (request, response) => {
    try {
        const { start_date, end_date } = request.body;

        const randonQuery = `SELECT SUM (total_price) FROM sales`;
        const queryByDate = `SELECT SUM (total_price) FROM sales
        WHERE sales.sales_date >= $1 
        AND sales.sales_date <= $2 `;

        const saleReportResult = start_date && end_date ? await pool.query(queryByDate, [start_date, end_date]
        ) : await pool.query(randonQuery)

        if (start_date > end_date) {
            return response
                .status(400)
                .json({
                    status: `Please check your dates.`,
                })
        }

        console.log(saleReportResult.rows);

        if (start_date && end_date) {
            return response
                .status(200)
                .json({
                    status: `Sales report from ${start_date} to ${end_date} is created.`,
                    totalSale: `Euro: ${saleReportResult.rows[0].sum}`
                })
        } else {
            return response
                .status(200)
                .json({
                    status: `A total sales report is created.`,
                    totalSale: `Euro: ${saleReportResult.rows[0].sum}`
                })
        }

    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

// get gross profit report by date or without date
const createGrossProfitByDate = async (request, response) => {
    try {
        const { start_date, end_date } = request.body;

        const randonQuery = `SELECT SUM (total_price - service_buying_price) FROM sales`;
        const queryByDate = `select  SUM (total_price - service_buying_price) FROM sales 
        WHERE sales.sales_date >= $1 AND sales.sales_date <= $2`;

        const grossProfitQuery = start_date && end_date ? await pool.query(queryByDate, [start_date, end_date]
        ) : await pool.query(randonQuery)

        console.log(grossProfitQuery.rows);

        if (start_date > end_date) {
            return response
                .status(400)
                .json({
                    status: `Please check your dates.`,
                })
        }

        if (start_date && end_date && grossProfitQuery.rows.length > 0) {
            return response
                .status(200)
                .json({
                    status: `A Gross Profit Report from ${start_date} to ${end_date} is created.`,
                    GrossProfit: grossProfitQuery.rows[0].sum
                })
        } else {
            return response
                .status(200)
                .json({
                    status: `A total Gross Profit Report is created.`,
                    TotalGrossProfit: grossProfitQuery.rows[0].sum
                })
        }

    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

// get Net profit report by date or without date
const getNetProfit = async (request, response) => {
    try {
        const { start_date, end_date } = request.body;

        const randonQuery = `SELECT SUM (total_price - service_buying_price) FROM sales`;
        const queryByDate = `select  SUM (total_price - service_buying_price) FROM sales 
        WHERE sales.sales_date >= $1 AND sales.sales_date <= $2`;
        const expensesQuery = `SELECT management_cost from expenses`;

        const grossProfitQuery = start_date && end_date ? await pool.query(queryByDate, [start_date, end_date]
        ) : await pool.query(randonQuery)
        const grossProfitQueryResult = grossProfitQuery.rows[0].sum;;


        const totalExpensesQuery = await pool.query(expensesQuery);
        const totalExpensesQueryResult = totalExpensesQuery.rows[0].management_cost;
        const netProfit = parseInt(grossProfitQueryResult - totalExpensesQueryResult)

        if (start_date && end_date && grossProfitQuery.rows.length > 0) {
            return response
                .status(200)
                .json({
                    status: `A net Profit report from ${start_date} to ${end_date} is created.`,
                    NetProfit: netProfit
                })
        } else {
            return response
                .status(200)
                .json({
                    status: `A Net Profit Report is created.`,
                    NetProfit: netProfit
                })
        }

    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}

//show all reports
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

router.post("/total-sales", createSaleReportByDate);
router.post("/gross-profit", createGrossProfitByDate);
router.get("/", getReports);
router.get("/net-profit", getNetProfit);

module.exports = router;