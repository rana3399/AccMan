const express = require("express");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const router = require("express").Router();

//show all expenses
const getExpenses = async (req, res) => {
    try {
        const result = await pool.query("select * from expenses")
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

// create a expenses reports with or without date
const getTotalExpensesByDate = async (request, response) => {
    try {
        const { from_date, to_date } = request.body;

        const expensesQueryByDate = `SELECT SUM(COALESCE(salary,0) + COALESCE(management_cost,0)) 
        FROM expenses
        where from_date >= $1
        and to_date <= $2`
        const expensesQueryByDateResult = await pool.query(expensesQueryByDate, [from_date, to_date]);

        if (from_date > to_date) {
            return response
                .status(400)
                .json({
                    status: `Please check your dates.`,
                })
        }

        if (from_date && to_date) {
            return response
                .status(200)
                .json({
                    status: `Expenses report from ${from_date} to ${to_date} is created.`,
                    totalExpenses: `Euro: ${expensesQueryByDateResult.rows[0].sum}`
                })
        } else {
            const randomExpensesQuery = `SELECT SUM(COALESCE(salary,0) + COALESCE(management_cost,0))
            FROM expenses`
            const expensesQuery = await pool.query(randomExpensesQuery);

            return response
                .status(200)
                .json({
                    status: `A total expenses report is created.`,
                    totalSale: `Euro: ${expensesQuery.rows[0].sum}`
                })
        }
    } catch (error) {
        console.error(error.message);
        response.status(404).send({ error: error.message });
    }
}


//router.post("/", addNewInvoice)
router.get("/", getExpenses)
router.post("/total-expenses", getTotalExpensesByDate)



module.exports = router;

